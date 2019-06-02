using System.Collections.Generic;
using Users.Models;
using Users.Services;
using Microsoft.AspNetCore.Mvc;

namespace Users.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UserService _userService;

        public UsersController(UserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public ActionResult<List<User>> Get()
        {
            return _userService.Get();
        }

        [HttpGet("[action]/{id}", Name = "GetUser")]
        public ActionResult<User> GetById(int id)
        {
            var user = _userService.Get(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        [HttpGet("[action]/{email}", Name = "GetUserByEmail")]
        public ActionResult<User> GetByEmail(string email)
        {
            var user = _userService.Get(email);

            if (user == null)
            {
                return NotFound();
            }
            return user;
        }

        [HttpPost]
        public ActionResult<User> Create(User user)
        {
            _userService.Create(user);

            return CreatedAtRoute("GetUser", new { id = user._id.ToString() }, user);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, User userIn)
        {
            var user = _userService.Get(id);

            if (user == null)
            {
                return NotFound();
            }

            _userService.Update(id, userIn);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var user = _userService.Get(id);

            if (user == null)
            {
                return NotFound();
            }

            _userService.Remove(user.ID);

            return NoContent();
        }

        [HttpPost("login")]
        public ActionResult<User> Login ([FromBody]User user)
        {   
            if  (user == null)
                return BadRequest("Invalid client request");

            var _user = _userService.Get(user.Email);

            if(_user == null)
              return Unauthorized();

            if(user.Email == _user.Email && user.Password == _user.Password)
                return Ok();
            else
              return Unauthorized();
        }
    }
}