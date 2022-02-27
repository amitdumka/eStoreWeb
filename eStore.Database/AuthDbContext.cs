using eStore.Shared.Models.Identity;
using IdentityServer4.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace eStore.Database
{
    public class AuthDbContext : ApiAuthorizationDbContext<AppUser>
    {
        public AuthDbContext(
            DbContextOptions options,
            IOptions<OperationalStoreOptions> operationalStoreOptions) : base(options, operationalStoreOptions)
        {
        }
    }

    //public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>
    //{
    //    public ApplicationDbContext(
    //        DbContextOptions options,
    //        IOptions<OperationalStoreOptions> operationalStoreOptions) : base (options, operationalStoreOptions)
    //    {
    //    }
    //}
}