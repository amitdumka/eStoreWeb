using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace eStore
{
    [Route ("api/[controller]")]
    [ApiController]
    [Authorize]
    public class BankerController : ControllerBase
    {
        // GET: api/<BankerController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string [] { "Test Value 1", "Test value 2" };
        }

        // GET api/<BankerController>/5
        [HttpGet ("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<BankerController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<BankerController>/5
        [HttpPut ("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<BankerController>/5
        [HttpDelete ("{id}")]
        public void Delete(int id)
        {
        }
    }
}
