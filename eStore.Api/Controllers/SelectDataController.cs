using AutoMapper;
using eStore.Database;
using eStore.ViewModes.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace eStore.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class SelectDataController : ControllerBase
    {
        private readonly IMapper _mapper;
        private eStoreDbContext db;

        public SelectDataController(eStoreDbContext context, IMapper mapper)
        {
            db = context;
            _mapper = mapper;
        }

        // GET: api/SelectData
        [HttpGet]
        public string Get()
        {
            return "Default Action is not allowd. Kindly use sub route(s)";
        }

        // GET api/SelectData/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return Get();
        }

        // GET: api/SelectData/BookingList
        [HttpGet("bookingList/{isDeliveried}")]
        public async Task<List<BookingBasicDto>> GetBookingListAsync(bool isDeliveried = false)
        {
            var data = await db.TalioringBookings.Where(c => c.IsDelivered == isDeliveried).Select(c => new BookingBasicDto { TalioringBookingId = c.TalioringBookingId, BookingSlipNo = c.BookingSlipNo, BookingDate = c.BookingDate, DeliveryDate = c.DeliveryDate, IsDelivered = c.IsDelivered }).ToListAsync();
            return data;
        }

        [HttpGet("StoreList")]
        public async Task<List<StoreIdList>> GetStoreListAsync()
        {
            return await db.Stores.Select(c => new StoreIdList { StoreId = c.StoreId, StoreCode = c.StoreCode, StoreName = c.StoreName + " " + c.City }).OrderBy(c => c.StoreId).ToListAsync();
        }

        [HttpGet("bookingList/dto")]
        public IEnumerable<BookingBasicDto> GetBookingListDto() => _mapper.Map<IEnumerable<BookingBasicDto>>(db.TalioringBookings.Where(c => !c.IsDelivered).OrderByDescending(c => c.DeliveryDate).ToList());
    }
}

namespace eStore.ViewModes.Dtos
{
    public class StoreIdList
    { public int StoreId; public string StoreCode; public string StoreName; }

    public class BookingBasicDto
    {
        public int TalioringBookingId { get; set; }
        public DateTime BookingDate { get; set; }
        public DateTime DeliveryDate { get; set; }
        public bool IsDelivered { get; set; }
        public string BookingSlipNo { get; set; }
    }
}