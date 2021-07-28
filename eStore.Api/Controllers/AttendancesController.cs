using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using eStore.Database;
using eStore.Shared.Models.Payroll;
using Microsoft.AspNetCore.Authorization;
using AutoMapper;
using eStore.Shared.DTOs.Payrolls;

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
            _context = context; _mapper = mapper;
        }

        // GET: api/Attendances
        [HttpGet]
        public IEnumerable<AttendanceDto> GetAttendances()
        {
            //return await _context.Attendances.Include(a => a.Store).Where(c => c.AttDate == DateTime.Today.Date).ToListAsync();
            var attList=  _context.Attendances.Include(c=>c.Employee).Include(a => a.Store).Where(c => c.AttDate == DateTime.Today.Date).ToList();
            return _mapper.Map<IEnumerable<AttendanceDto>>(attList);
            //return (Task<ActionResult<IEnumerable<AttendanceDto>>>)GetToDto(attList);
        }
        [HttpGet("year")]
        public IEnumerable<AttendanceDto> GetYearAttendances()
        {
            //return await _context.Attendances.Include(a => a.Store).Where(c => c.AttDate == DateTime.Today.Date).ToListAsync();
            var attList = _context.Attendances.Include (c => c.Employee).Include (a => a.Store).Where (c => c.AttDate.Year == DateTime.Today.Year).ToList ();
            return _mapper.Map<IEnumerable<AttendanceDto>> (attList);
            //return (Task<ActionResult<IEnumerable<AttendanceDto>>>)GetToDto(attList);
        }
        [HttpGet ("month")]
        public IEnumerable<AttendanceDto> GetMonthAttendances()
        {
            //return await _context.Attendances.Include(a => a.Store).Where(c => c.AttDate == DateTime.Today.Date).ToListAsync();
            var attList = _context.Attendances.Include (c => c.Employee).Include (a => a.Store).Where (c => c.AttDate.Month == DateTime.Today.Month &&c.AttDate.Year == DateTime.Today.Year).ToList ();
            return _mapper.Map<IEnumerable<AttendanceDto>> (attList);
            //return (Task<ActionResult<IEnumerable<AttendanceDto>>>)GetToDto(attList);
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
        [HttpPost("Find")]
        public IEnumerable<AttendanceDto> PostFindAttendaces(FindDTO qp)
        {
            int[] Filters = new int[6] { 0, 0, 0, 0, 0, 0 };
            FilterDTO queryParms = qp.filters;

            var attList = _context.Attendances.Include(c => c.Employee).Include(a => a.Store).
                Where(c => c.AttDate.Date ==  DateTime.Today.Date).ToList();

            if (queryParms.OnDate != null) { Filters[5] = 1;
                attList = _context.Attendances.Include(c => c.Employee).Include(a => a.Store).
                Where(c => c.AttDate.Date == (queryParms.OnDate.HasValue ? queryParms.OnDate.Value : DateTime.Today).Date).ToList();
            }
            if (queryParms.EmployeeId > 0) {
                Filters[0] = 1;
                 attList = _context.Attendances.Include(c => c.Employee).Include(a => a.Store).
               Where(c => c.EmployeeId==queryParms.EmployeeId).OrderByDescending(c=>c.AttDate).ToList();
            }
            if (!string.IsNullOrEmpty(queryParms.FirstName)) {
                Filters[4] = 1;
                attList = _context.Attendances.Include(c => c.Employee).Include(a => a.Store).
              Where(c => c.Employee.FirstName == queryParms.FirstName).OrderByDescending(c => c.AttDate).ToList();
            }
            if (!string.IsNullOrEmpty(queryParms.LastName))
            {
                Filters[3] = 1;
                attList = _context.Attendances.Include(c => c.Employee).Include(a => a.Store).
              Where(c => c.Employee.LastName == queryParms.LastName).OrderByDescending(c => c.AttDate).ToList();
            }
            if (queryParms.Status!=null)
            {
                Filters[1] = 1;
                attList = _context.Attendances.Include(c => c.Employee).Include(a => a.Store).
              Where(c => c.Status==queryParms.Status).OrderByDescending(c => c.AttDate).ToList();
            }
            if (queryParms!=null) { Filters[2] = 1;

                attList = _context.Attendances.Include(c => c.Employee).Include(a => a.Store).
              Where(c => c.Employee.Category==queryParms.Type).OrderByDescending(c => c.AttDate).ToList();
            }


            

            return _mapper.Map<IEnumerable<AttendanceDto>>(attList);
        }


        // PUT: api/Attendances/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAttendance(int id, Attendance attendance)
        {
            if (id != attendance.AttendanceId)
            {
                return BadRequest();
            }

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

        // POST: api/Attendances
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Attendance>> PostAttendance(Attendance attendance)
        {
            attendance.AttDate = attendance.AttDate.Date;
            _context.Attendances.Add(attendance);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAttendance", new { id = attendance.AttendanceId }, attendance);
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
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AttendanceExists(int id)
        {
            return _context.Attendances.Any(e => e.AttendanceId == id);
        }
    }

   public class FindDTO
    {
        public FilterDTO filters { get; set; }
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public string SortFiled { get; set; }
        public string SortOrder { get; set; }


    }


    public class FilterDTO
    {
        public int EmployeeId { get; set; }
        public AttUnit? Status { get; set; }
        public EmpType? Type { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public DateTime? OnDate { get; set; }
    }
}
