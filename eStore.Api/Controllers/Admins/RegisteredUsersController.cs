using eStore.Database;
using eStore.Shared.Models.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eStore.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegisteredUsersController : ControllerBase
    {
        private readonly eStoreDbContext _context;

        public RegisteredUsersController(eStoreDbContext context)
        {
            _context = context;
        }

        // GET: api/RegisteredUsers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<RegisteredUser>>> GetRegisteredUsers()
        {
            return await _context.RegisteredUsers.ToListAsync();
        }

        //[HttpGet("Roles")]
        //public async Task<ActionResult<IEnumerable<Microsoft.AspNetCore.Identity.IdentityUserRole<string>>>> GetRoles()
        //{
        //    return await _context.UserRoles.ToListAsync ();
        //}

        // GET: api/RegisteredUsers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<RegisteredUser>> GetRegisteredUser(string id)
        {
            var registeredUser = await _context.RegisteredUsers.FindAsync(id);

            if (registeredUser == null)
            {
                return NotFound();
            }

            return registeredUser;
        }

        // PUT: api/RegisteredUsers/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRegisteredUser(string id, RegisteredUser registeredUser)
        {
            if (id != registeredUser.RegisteredUserId)
            {
                return BadRequest();
            }

            _context.Entry(registeredUser).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RegisteredUserExists(id))
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

        // POST: api/RegisteredUsers
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("Login")]
        public async Task<ActionResult<RegisteredUser>> PostPerformLogin(string userId)
        {
            var user = _context.RegisteredUsers.Find(userId);
            if (user == null)
                return NotFound();
            if (user.IsUserLoggedIn)
            {
                if ((DateTime.Now - user.LastLoggedIn).Hours < 24)
                    return Ok("User Already Logged In");
            }

            user.IsUserLoggedIn = true;
            user.LastLoggedIn = DateTime.Now;
            await _context.SaveChangesAsync();
            return Ok("New Logged In");
        }

        [HttpPost("Logout")]
        public async Task<ActionResult<RegisteredUser>> PostPerformLogOut(string userId)
        {
            var user = _context.RegisteredUsers.Find(userId);
            if (user == null)
                return NotFound();
            if (user.IsUserLoggedIn)
            {
                user.IsUserLoggedIn = false;
                user.LastLoggedIn = DateTime.Now;
                await _context.SaveChangesAsync();
                return Ok("Logged Out");
            }
            return Ok("Already Logged Out");
        }

        // POST: api/RegisteredUsers
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<RegisteredUser>> PostRegisteredUser(RegisteredUser registeredUser)
        {
            _context.RegisteredUsers.Add(registeredUser);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (RegisteredUserExists(registeredUser.RegisteredUserId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetRegisteredUser", new { id = registeredUser.RegisteredUserId }, registeredUser);
        }

        // DELETE: api/RegisteredUsers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRegisteredUser(string id)
        {
            var registeredUser = await _context.RegisteredUsers.FindAsync(id);
            if (registeredUser == null)
            {
                return NotFound();
            }

            _context.RegisteredUsers.Remove(registeredUser);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RegisteredUserExists(string id)
        {
            return _context.RegisteredUsers.Any(e => e.RegisteredUserId == id);
        }

        // GET: api/RegisteredUsers/5    async Task<ActionResult<void>>
        //[HttpGet ("Role")]
        //public async Task<ActionResult<List<Microsoft.AspNetCore.Identity.IdentityUserRole<string>>>> GetUserRoleAsync(string id)
        //{
        //    var registeredUser = await _context.RegisteredUsers.FindAsync (id);
        //    var roles = await _context.UserRoles.Where (c => c.UserId == id).ToListAsync ();

        //    if ( registeredUser == null )
        //    {
        //        return NotFound ();
        //    }

        //    return roles;
        //}
        //[HttpPost ("Role")]
        //public async Task<ActionResult<RegisteredUser>> PostAddRole(Microsoft.AspNetCore.Identity.IdentityUserRole<string> userRole)
        //{
        //    if ( !RegisteredUserExists (userRole.UserId) )
        //        return NotFound ();
        //    _context.UserRoles.Add (userRole);
        //    try
        //    {
        //        await _context.SaveChangesAsync ();
        //    }
        //    catch ( DbUpdateException )
        //    {
        //        throw;

        //    }

        //    return Ok ("Role Added");
        //}
        //[HttpDelete ("Role{id}")]
        //public async Task<IActionResult> DeleteUserRole(string id, string roleId)
        //{
        //    var role = await _context.UserRoles.Where (c => c.UserId == id && c.RoleId == roleId).FirstOrDefaultAsync ();
        //    if ( role != null )
        //        _context.UserRoles.Remove (role);
        //    else
        //        return NotFound ();
        //    await _context.SaveChangesAsync ();
        //    return NoContent ();
        //}
    }
}