using eStore.Database;
using eStore.Lib.Exporters;
using eStore.Shared.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace eStore.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class AppsController : ControllerBase
    {
        private readonly eStoreDbContext _context;

        public AppsController(eStoreDbContext context)
        {
            _context = context;
        }

        // GET: api/Apps
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AppInfo>>> GetApps()
        {
            return await _context.Apps.ToListAsync();
        }

        // GET: api/Apps
        [HttpGet("backupJsonDB")]
        public async Task<FileStreamResult> GetJsonDatabaseAsync()
        {
            DatabaseExpoter de = new DatabaseExpoter(_context, 1);
            string filename = await de.ExportToJson();

            var stream = new FileStream(filename, FileMode.Open);
            return File(stream, "application/zip", "eStoreDBContextJson.zip");
        }

        // GET: api/Apps/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AppInfo>> GetAppInfo(int id)
        {
            var appInfo = await _context.Apps.FindAsync(id);

            if (appInfo == null)
            {
                return NotFound();
            }

            return appInfo;
        }

        // PUT: api/Apps/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAppInfo(int id, AppInfo appInfo)
        {
            if (id != appInfo.AppInfoId)
            {
                return BadRequest();
            }

            _context.Entry(appInfo).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AppInfoExists(id))
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

        // POST: api/Apps
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<AppInfo>> PostAppInfo(AppInfo appInfo)
        {
            _context.Apps.Add(appInfo);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAppInfo", new { id = appInfo.AppInfoId }, appInfo);
        }

        // DELETE: api/Apps/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAppInfo(int id)
        {
            var appInfo = await _context.Apps.FindAsync(id);
            if (appInfo == null)
            {
                return NotFound();
            }

            _context.Apps.Remove(appInfo);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AppInfoExists(int id)
        {
            return _context.Apps.Any(e => e.AppInfoId == id);
        }
    }
}