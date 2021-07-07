using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using eStore.Shared.Models.Stores;
using eStore.DL.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using eStore.BL.Commons;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace eStore.Areas.API
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class StoreOperationsController : ControllerBase
    {
        private readonly eStoreDbContext db;
        public StoreOperationsController(eStoreDbContext con)
        {
            db = con;
        }
        // GET: api/<StoreOperationsController>
        [HttpGet]
        public async Task<IEnumerable<StoreDailyOperation>> GetAsync()
        {
            var open = await db.StoreOpens.Where(c => c.OpenningTime.Date.Year == DateTime.Today.Date.Year).OrderByDescending(c => c.OpenningTime).ToListAsync();
            var close = await db.StoreCloses.Where(c => c.ClosingDate.Date.Year == DateTime.Today.Date.Year).OrderByDescending(c => c.ClosingDate).ToListAsync();

            List<StoreDailyOperation> toList = new List<StoreDailyOperation>();
            foreach (var item in open)
            {
                StoreDailyOperation a = new StoreDailyOperation
                {
                    StoreDailyOperationId = item.StoreOpenId,
                    ClosingTime = item.OpenningTime.Date,
                    StoreCloseId = -1,
                    IsReadOnly = item.IsReadOnly,
                    OnDate = item.OpenningTime.Date,
                    OpenningTime = item.OpenningTime,
                    StoreId = item.StoreId,
                    Remarks = "OR: " + item.Remarks,
                    StoreOpenId = item.StoreOpenId,
                    UserId = item.UserId,
                };

                StoreClose c = close.Where(c => c.ClosingDate.Date == item.OpenningTime.Date).FirstOrDefault();
                if (c != null)
                {
                    a.ClosingTime = c.ClosingDate; a.Remarks = a.Remarks + "   \t:CR: " + c.Remarks;
                    a.StoreCloseId = c.StoreCloseId;
                }

                toList.Add(a);
            }


            return toList;
        }

        [HttpGet("storeStatus")]
        public async Task<ActionResult<StoreStatusDto>> GetStoreStatusAsync(int StoreId)
        {
            var Closeid = await db.StoreCloses.Where(c => c.StoreId == StoreId && c.ClosingDate.Date == DateTime.Today.Date).Select(c => c.StoreCloseId).FirstOrDefaultAsync();

            var Openid = await db.StoreOpens.Where(c => c.StoreId == StoreId && c.OpenningTime.Date == DateTime.Today.Date).Select(c => c.StoreOpenId).FirstOrDefaultAsync();

            StoreStatusDto status = new StoreStatusDto { ClosedId = Closeid, OpenId = Openid };
            //string returnData = $"{{open:{Openid}, closeId: {Closeid}}}";
            //JsonResult result = new JsonResult(returnData);
            return status;
        }

        // GET api/<StoreOperationsController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<StoreDailyOperation>> GetAsync(int id)
        {
            var open = await db.StoreOpens.FindAsync(id);
            if (open != null)
            {
                StoreDailyOperation sdo = new StoreDailyOperation
                {
                    IsReadOnly = open.IsReadOnly,
                    OnDate = open.OpenningTime.Date,
                    OpenningTime = open.OpenningTime,
                    StoreId = open.StoreId,
                    Remarks = "OR: " + open.Remarks,
                    StoreOpenId = open.StoreOpenId,
                    UserId = open.UserId,
                };
                var close = await db.StoreCloses.Where(c => c.ClosingDate.Date == open.OpenningTime.Date).FirstOrDefaultAsync();

                if (close != null)
                {
                    sdo.ClosingTime = close.ClosingDate; sdo.Remarks = sdo.Remarks + "   \t:CR: " + close.Remarks;
                    sdo.StoreCloseId = close.StoreCloseId;
                }
                else
                {
                    sdo.ClosingTime = open.OpenningTime.Date;
                    sdo.StoreCloseId = -1;
                }
                return sdo;

            }
            else
            {
                return NotFound();
            }


        }

        // POST api/<StoreOperationsController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<StoreOperationsController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<StoreOperationsController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }

        [HttpPost("storeClosed")]
        public async Task<ActionResult<IEnumerable<Shared.Models.Payroll.Attendance>>> PostStoreCloseAsync(StoreHoliday holiday)
        {
            db.StoreHolidays.Add(holiday);
            var status = await db.SaveChangesAsync();

            if (status > 0)
            {

                var result = await StoreManager.GenerateAttendancForStoreClosedAsync(db, holiday.StoreId, holiday.Reason, holiday.Remarks, holiday.OnDate);

                if (result)
                {
                    var att = await db.Attendances.Include(c => c.Employee).Where(c => c.StoreId == holiday.StoreId && c.AttDate == holiday.OnDate).ToListAsync();
                    return att;

                }
                else return NotFound();
            }
            else return NotFound();
        }
        [HttpPost("storeClosedNDays")]
        public async Task<bool> PostStoreClosedNDaysAsync(StoreHolidays storeHolidays)
        {
            List<StoreHoliday> hList = new List<StoreHoliday>();
            DateTime onDate = storeHolidays.Holiday.OnDate;
            do
            {
                storeHolidays.Holiday.OnDate = onDate;
                hList.Add(storeHolidays.Holiday);
                onDate = onDate.AddDays(1);

            } while (onDate.Date > storeHolidays.EndDate.Date);
            try
            {
                await db.StoreHolidays.AddRangeAsync(hList);
                await db.SaveChangesAsync();
                await StoreManager.GenerateAttendancForStoreClosedAsync(db, storeHolidays.Holiday.StoreId, storeHolidays.Holiday.Reason, storeHolidays.Holiday.Remarks, storeHolidays.Holiday.OnDate, storeHolidays.EndDate);
                return true;
            }
            catch (Exception e)
            {

                Console.WriteLine(e.Message);
                return false;
            }



        }
    }

    public class StoreStatusDto
    {
        public int OpenId { get; set; }
        public int ClosedId { get; set; }
    }
}
