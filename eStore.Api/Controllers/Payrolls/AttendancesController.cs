using AutoMapper;
using eStore.BL.Reports.Payroll;
using eStore.Database;
using eStore.Payroll;
using eStore.Shared.DTOs.Payrolls;
using eStore.Shared.Models.Payroll;
using eStore.Validator;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MonthlyAttendance = eStore.Shared.Models.Payroll.MonthlyAttendance;

namespace eStore.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class AttendancesController : ControllerBase
    {
        private readonly eStoreDbContext _context;
        private readonly IMapper _mapper;

        public AttendancesController(eStoreDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // DELETE: api/Attendances/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAttendance(int id)
        {
            var attendance = await _context.Attendances.FindAsync(id);
            if (attendance == null)
            {
                return NotFound();
            }
            _context.Attendances.Remove(attendance);
            new PayrollManager().ONInsertOrUpdate(_context, attendance, CRUD.Delete);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpGet("PMA")]
        public async Task<ActionResult<bool>> GetPMA()
        {
            eStore.Reports.Payrolls.PayrollManager pm = new eStore.Reports.Payrolls.PayrollManager();
            return pm.ProcessMonthlyAttendance(_context);
        }

        // GET: api/Attendances/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Attendance>> GetAttendance(int id)
        {
            var attendance = await _context.Attendances.FindAsync(id);

            if (attendance == null)
            {
                return NotFound();
            }
            return attendance;
        }
        // GET: api/Attendances/24/07/1982
        [HttpGet("MA")]
        public async Task<ActionResult<List<MonthlyAttendance>>> GetMA(DateTime? onDate)
        {
            DateTime date;
           date= onDate.HasValue?onDate.Value: DateTime.Today;

            var attendance = await _context.MonthlyAttendances.Where(c => c.OnDate.Date.Month == date.Month && c.OnDate.Year == date.Year).OrderBy(c => c.EmployeeId).ToListAsync();

            if (attendance == null)
            {
                return NotFound();
            }
            return attendance;
        }

        // GET: api/Attendances
        [HttpGet]
        public IEnumerable<AttendanceDto> GetAttendances()
        {
            //return await _context.Attendances.Include(a => a.Store).Where(c => c.AttDate == DateTime.Today.Date).ToListAsync();
            var attList = _context.Attendances.Include(c => c.Employee).Where(c => c.AttDate == DateTime.Today.Date).ToList();
            return _mapper.Map<IEnumerable<AttendanceDto>>(attList);
            //return (Task<ActionResult<IEnumerable<AttendanceDto>>>)GetToDto(attList);
        }

        [HttpGet("month")]
        public IEnumerable<AttendanceDto> GetMonthAttendances()
        {
            //return await _context.Attendances.Include(a => a.Store).Where(c => c.AttDate == DateTime.Today.Date).ToListAsync();
            var attList = _context.Attendances.Include(c => c.Employee).Where(c => c.AttDate.Month == DateTime.Today.Month && c.AttDate.Year == DateTime.Today.Year).ToList();
            return _mapper.Map<IEnumerable<AttendanceDto>>(attList);
            //return (Task<ActionResult<IEnumerable<AttendanceDto>>>)GetToDto(attList);
        }

        [HttpGet("year")]
        public IEnumerable<AttendanceDto> GetYearAttendances()
        {
            //return await _context.Attendances.Include(a => a.Store).Where(c => c.AttDate == DateTime.Today.Date).ToListAsync();
            var attList = _context.Attendances.Include(c => c.Employee).Where(c => c.AttDate.Year == DateTime.Today.Year).ToList();
            return _mapper.Map<IEnumerable<AttendanceDto>>(attList);
            //return (Task<ActionResult<IEnumerable<AttendanceDto>>>)GetToDto(attList);
        }

        // POST: api/Attendances
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Attendance>> PostAttendance(Attendance attendance)
        {
            attendance.AttDate = attendance.AttDate.Date;
            if (!DBValidation.AttendanceDuplicateCheck(_context, attendance))
            {
                _context.Attendances.Add(attendance);
                await _context.SaveChangesAsync();
                new PayrollManager().ONInsertOrUpdate(_context, attendance, CRUD.Create);
                return CreatedAtAction("GetAttendance", new { id = attendance.AttendanceId }, attendance);
            }
            else
            {
                Console.WriteLine("Validatation at adding attendance is failed!!!");
                return BadRequest();
            }
        }

        [HttpPost("Find")]
        public IEnumerable<AttendanceDto> PostFindAttendaces(FilterDTO qp)
        {
            int[] Filters = new int[6] { 0, 0, 0, 0, 0, 0 };
            FilterDTO queryParms = qp;

            if (!string.IsNullOrEmpty(queryParms.SearchText))
            {
                var st = queryParms.SearchText.Split(":");
                switch (st[0].ToUpper())
                {
                    case "ID":
                        queryParms.EmployeeId = int.Parse(st[1].Trim());
                        break;

                    case "DATE":
                        DateTime tDate;
                        if (DateTime.TryParse(st[1].Trim(), out tDate))
                        {
                            queryParms.OnDate = tDate;
                        }
                        break;

                    case "NAME":
                        queryParms.StaffName = st[1].Trim();
                        break;

                    default:

                        break;
                }
            }

            DateTime onDate = queryParms.OnDate.HasValue ? queryParms.OnDate.Value : DateTime.Today;

            var attList = _context.Attendances.Include(c => c.Employee).Include(a => a.Store).
                Where(c => c.AttDate.Date == onDate.Date).ToList();

            //Filter and Search
            //if ( queryParms.OnDate != null )
            //{
            //    Filters [5] = 1;
            //    attList = _context.Attendances.Include (c => c.Employee).Include (a => a.Store).
            //    Where (c => c.AttDate.Date == ( queryParms.OnDate.HasValue ? queryParms.OnDate.Value : DateTime.Today ).Date).ToList ();
            //}
            //else
            if (queryParms.EmployeeId > 0)
            {
                Filters[0] = 1;
                attList = _context.Attendances.Include(c => c.Employee).Include(a => a.Store).
              Where(c => c.EmployeeId == queryParms.EmployeeId).OrderByDescending(c => c.AttDate).ToList();
            }
            else if (!string.IsNullOrEmpty(queryParms.StaffName))
            {
                Filters[4] = 1;
                attList = _context.Attendances.Include(c => c.Employee).Include(a => a.Store).
              Where(c => c.Employee.StaffName == queryParms.StaffName).OrderByDescending(c => c.AttDate).ToList();
            }

            if (queryParms.Status != null && ((int)queryParms.Status) > -1)
            {
                Filters[1] = 1;
                attList = attList.
              Where(c => c.Status == queryParms.Status).OrderByDescending(c => c.AttDate).ToList();
            }
            if (queryParms.Type != null && ((int)queryParms.Type) > -1)
            {
                Filters[2] = 1;
                attList = attList.
              Where(c => c.Employee.Category == queryParms.Type).OrderByDescending(c => c.AttDate).ToList();
            }
            return _mapper.Map<IEnumerable<AttendanceDto>>(attList);
        }

        // PUT: api/Attendances/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAttendance(int id, Attendance attendance)
        {    // TODO :
            if (id != attendance.AttendanceId || DBValidation.AttendanceDuplicateCheckWithID(_context, attendance))
            {
                return BadRequest();
            }
            new PayrollManager().ONInsertOrUpdate(_context, attendance, CRUD.Update);
            _context.Entry(attendance).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AttendanceExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        private bool AttendanceExists(int id)
        {
            return _context.Attendances.Any(e => e.AttendanceId == id);
        }

        private IEnumerable<AttendanceDto> GetToDto(IEnumerable<Attendance> colList)
        {
            List<AttendanceDto> dto = new List<AttendanceDto>();
            foreach (var obj in colList)
            {
                dto.Add(_mapper.Map<AttendanceDto>(obj));
            }
            return dto.ToList();
        }
    }

    public class FilterDTO
    {
        public int EmployeeId { get; set; }
        public DateTime? OnDate { get; set; }
        public string SearchText { get; set; }
        public string StaffName { get; set; }
        public AttUnit? Status { get; set; }
        public EmpType? Type { get; set; }
        //public bool? Yesterday { get; set; }
    }

    public class FindDTO
    {
        public FilterDTO Filter { get; set; }
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public string SortFiled { get; set; }
        public string SortOrder { get; set; }
    }
}