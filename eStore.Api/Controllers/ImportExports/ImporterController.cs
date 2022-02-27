using eStore.BL;
using eStore.BL.Importer;
using eStore.Database;
using eStore.Services.BTask;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Threading.Tasks;

namespace eStore.API.Controllers
{
    public class ImportDto
    {
        public string CommandMode { get; set; }
        public dynamic JsonData { get; set; }
        public string EmailId { get; set; }
        public string CallBackUrl { get; set; }
    }

    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class ImporterController : ControllerBase
    {
        public IBackgroundTaskQueue _queue { get; }
        private readonly IServiceScopeFactory _serviceScopeFactory;
        private readonly eStoreDbContext db;

        public ImporterController(IBackgroundTaskQueue queue, IServiceScopeFactory serviceScopeFactory, eStoreDbContext con)
        {
            _queue = queue;
            db = con;
            _serviceScopeFactory = serviceScopeFactory;
        }

        // POST: api/Importer
        [HttpPost]
        public ActionResult Post(ImportDto import)
        {
            _queue.QueueBackgroundWorkItem(async token =>
           {
               using (var scope = _serviceScopeFactory.CreateScope())
               {
                   var db = scope.ServiceProvider.GetRequiredService<eStoreDbContext>();
                   new DataImpoter().ImportJson(db, import.CommandMode, import.JsonData, import.EmailId, import.CallBackUrl);
                   await Task.Delay(TimeSpan.FromSeconds(5), token);
               }
           });
            return Ok("Uploader is processing! It will be inform after completation. ");
        }

        [HttpPost("voyagerImport")]
        public ActionResult PostVoyagerData(ImportDto import)
        {
            _queue.QueueBackgroundWorkItem(async token =>
           {
               using (var scope = _serviceScopeFactory.CreateScope())
               {
                   var db = scope.ServiceProvider.GetRequiredService<eStoreDbContext>();
                   ImportVoyData.ImportJsonAsync(db, import.CommandMode, import.JsonData, import.EmailId, import.CallBackUrl);
                   await Task.Delay(TimeSpan.FromSeconds(5), token);
               }
           });
            return Ok("Uploader is processing! It will be inform after completation. ");
        }

        [HttpPost("ProcessVoyager")]
        public ActionResult PostProcessVoyagerUpload(ProcessorCommand command)
        {
            if (
           // new UploadProcessor().ProcessVoyagerUpload(db, command))
           UploadProcessor.ProcessUpload(db, command))

                return Ok("Command Processed");
            else
                return Ok("Error occured");
        }
    }
}