using eStore.Database;
using eStore.Services.BTask;
using eStore.Shared.Models.Identity;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using System;

//using Microsoft.AspNetCore.Http;
//using Microsoft.AspNetCore.Authorization;
//using Microsoft.AspNetCore.Mvc.Authorization;
//using Microsoft.AspNetCore.Authentication.Cookies;
//using System.Threading.Tasks;
//using eStore.Services.BTask;

namespace eStore
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //services.AddDbContext<ApplicationDbContext>(options =>
            //    options.UseSqlServer(
            //        Configuration.GetConnectionString("DefaultConnection")));

            services.AddDbContext<AuthDbContext>(options =>
               options.UseSqlServer(
                   Configuration.GetConnectionString("AuthDBCon")));

            services.AddDbContext<eStoreDbContext>(options =>
                options.UseSqlServer(
                    Configuration.GetConnectionString("eStoreCon")));

            services.AddDatabaseDeveloperPageExceptionFilter();
            services.AddDefaultIdentity<AppUser>(options => options.SignIn.RequireConfirmedAccount = true)
                .AddEntityFrameworkStores<AuthDbContext>();
            // services.AddIdentityServer()
            //     .AddApiAuthorization<AppUser, AuthDbContext>();
            // services.AddAuthentication()
            //     .AddIdentityServerJwt();
            //services.AddControllers ().AddJsonOptions (x =>x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.Preserve);
            services.AddControllers().AddJsonOptions(x => x.JsonSerializerOptions.ReferenceHandler = null);
            services.AddControllersWithViews();
            services.AddRazorPages();
            services.AddDistributedMemoryCache();
            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
            services.AddHostedService<QueuedHostedService>();
            services.AddSingleton<IBackgroundTaskQueue, BackgroundTaskQueue>();
            //services.AddControllers ();
            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
            services.AddSwaggerGen(c =>
           {
               c.SwaggerDoc("v1", new OpenApiInfo { Title = "eStore.API", Version = "v1" });
           });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseMigrationsEndPoint();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "eStore.API v1"));

            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            // Enable middleware to serve generated Swagger as a JSON endpoint.
            app.UseSwagger(c =>
            {
                c.SerializeAsV2 = true;

            });
            // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.),
            // specifying the Swagger JSON endpoint.
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "eStore.API V2");
                //c.DescribeAllEnumsAsStrings();
            });

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseRouting();

            app.UseAuthentication();
            // app.UseIdentityServer();
            app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
               name: "areas",
               pattern: "{area:exists}/{controller=Home}/{action=Index}/{id?}");

                // endpoints.MapControllers ();
                endpoints.MapControllerRoute(
                     name: "default",
                     pattern: "{controller}/{action=Index}/{id?}");
                endpoints.MapRazorPages();
                endpoints.MapControllers();
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}
