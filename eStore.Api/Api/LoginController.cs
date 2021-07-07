using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using eStore.Shared.Models.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace eStore.Areas.API
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class LoginController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        public LoginController(UserManager<AppUser> userMager, SignInManager<AppUser> signInManager)
        {
            _userManager = userMager;
            _signInManager = signInManager;
        }

        // GET: api/Login
        [HttpGet]
        public bool Get()
        {

           return _signInManager.IsSignedIn(User);

           
        }       
        //// POST: api/Login
        //[HttpPost]
        //public async Task<bool> PostAsync(bool isAdmin)
        //{
        //    // AppUser appUser = new AppUser { UserName = "Admin", PasswordHash = "Admin@1234" };
        //    var result = await _signInManager.PasswordSignInAsync("Admin", "Admin@1234", true, false);
        //    if (result.Succeeded)
        //    {
        //        // _logger.LogInformation("User logged in.");
        //        //Setting UserSession
        //        //PostLogin.SetUserSession(HttpContext.Session, db, Input.Email);
        //        return true;
        //    }
        //    return false;

        //}
        [HttpPost]
        public async Task<bool> PostAsync(string uname, string password)
        {
            var result = await _signInManager.PasswordSignInAsync(uname,password, true, false);
            if (result.Succeeded)
            {
                // _logger.LogInformation("User logged in.");
                //Setting UserSession
                //PostLogin.SetUserSession(HttpContext.Session, db, Input.Email);
                return true;
            }
            return false;
        }

       
    }
}
