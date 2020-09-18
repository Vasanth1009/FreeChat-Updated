using System.Threading.Tasks;
using FreeChat.API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FreeChat.API.Controllers {
    [Route ("api/[controller]")]
    [ApiController]

    public class ValuesController : ControllerBase {
        private readonly DataContext _context;
        public ValuesController (DataContext context) {
            _context = context;

        }

        [Authorize(Roles = "Admin, Moderator")]
        [HttpGet]
        public async Task<IActionResult> GetValues () {
            var values = await _context.Values.ToListAsync ();

            return Ok (values);
        }

        [Authorize(Roles = "Member")]
        [HttpGet ("{id}")]
        public async Task<IActionResult> GetValues (int id) {
            var value = await _context.Values.FirstOrDefaultAsync (x => x.Id == id);
            return Ok (value);
        }

        [HttpPost]
        public void Post ([FromBody] string value) {

        }

        [HttpPut ("{id}")]
        public void Put (int id, [FromBody] string value) {

        }

        [HttpDelete ("{id}")]
        public void Delete (int id) {

        }
    }

}