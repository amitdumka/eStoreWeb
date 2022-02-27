using eStore.Shared.Models.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Threading.Tasks;
using static Microsoft.AspNetCore.Identity.UI.V4.Pages.Account.Internal.LoginModel;

//TODO: Remove this if it is not revelent
namespace eStore.Ops.Identity
{
    public class Auth
    {
        //TODO: Create API For Login/ Register and LogOut.  then this concept will work.
        public static async Task<string> LoginAsync(SignInManager<AppUser> _signInManager, InputModel Input, string returnUrl)
        {
            var result = await _signInManager.PasswordSignInAsync(Input.Email, Input.Password, Input.RememberMe, lockoutOnFailure: false);
            if (result.Succeeded)
            {
                // _logger.LogInformation("User logged in.");
                return (returnUrl);
            }

            if (result.IsLockedOut)
            {
                // _logger.LogWarning("User account locked out.");
                return ("./Lockout");
            }
            else
            {
                // ModelState.AddModelError(string.Empty, "Invalid login attempt.");
                return "Error";
            }
        }

        public static void Register()
        {
        }

        public static void LogOut()
        {
        }
    }

    public static class Seeder
    {
        public static async Task CreateRoles(IServiceProvider serviceProvider)
        {
            //adding custom roles
            var RoleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();
            var UserManager = serviceProvider.GetRequiredService<UserManager<AppUser>>();

            string[] roleNames = { "Admin", "StoreManager", "Salesman", "Accountant", "RemoteAccountant", "Member", "PowerUser", "GuestUsers", "GuestPowerUsers" };

            IdentityResult roleResult;

            foreach (var roleName in roleNames)
            {
                //creating the roles and seeding them to the database
                var roleExist = await RoleManager.RoleExistsAsync(roleName);
                if (!roleExist)
                {
                    roleResult = await RoleManager.CreateAsync(new IdentityRole(roleName));
                }
            }
            //creating a super user who could maintain the web app
            var poweruser = new AppUser
            {
                UserName = "Admin",
                Email = "Admin@eStore.In",
                EmployeeId = 0,
                IsEmployee = false,
                IsWorking = false,
                FirstName = "Admin",
                LastName = "User"
            };
            string UserPassword = "Admin@1234";
            var _user = await UserManager.FindByEmailAsync("Admin@eStore.In");
            if (_user == null)
            {
                var createPowerUser = await UserManager.CreateAsync(poweruser, UserPassword);
                if (createPowerUser.Succeeded)
                {
                    //here we tie the new user to the "Admin" role
                    await UserManager.AddToRoleAsync(poweruser, "Admin");

                    //Need to Update Confirmed Email.

                    _ = await UserManager.GetUserIdAsync(poweruser);
                    var code = await UserManager.GenerateEmailConfirmationTokenAsync(poweruser);
                    _ = await UserManager.ConfirmEmailAsync(poweruser, code);
                }
            }
        }
    }
}