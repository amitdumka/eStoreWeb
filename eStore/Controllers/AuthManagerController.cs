using eStore.Shared.Models.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace eStore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthManagerController : ControllerBase
    {
        private SignInManager<AppUser> _signInManager;
        private UserManager<AppUser> UserManager;

        //public async Task PostLoginAsync(LoginUser user)
        //{
        //    // This doesn't count login failures towards account lockout
        //    // To enable password failures to trigger account lockout, 
        //    // set lockoutOnFailure: true
        //    var result = await _signInManager.PasswordSignInAsync (user.UserName,
        //                       user.Password, true, lockoutOnFailure: true);
        //    if ( result.Succeeded )
        //    {
        //        var usr= await _signInManager.UserManager.GetUserAsync(null);

        //        return LocalRedirect (returnUrl);
        //    }  
        //    else

        //    if ( result.IsLockedOut )
        //    {
        //       // _logger.LogWarning ("User account locked out.");
        //        return RedirectToPage ("./Lockout");
        //    }
        //    else
        //    {
        //        ModelState.AddModelError (string.Empty, "Invalid login attempt.");
        //        return Page ();
        //    }
        //}



        // GET: api/<AuthManagerController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<AuthManagerController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<AuthManagerController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<AuthManagerController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<AuthManagerController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }

    public class LoginUser
    {
        public string UserName { get; set; }
        public string Password { get; set; }
        public string AccessToken { get; set; }
        public bool IsLogIn { get; set; }
    }

}
