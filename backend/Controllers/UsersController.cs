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
        public ActionResult<User> GetById(string id)
        {
            var user = _userService.GetByID(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        [HttpGet("[action]/{email}", Name = "GetUserByEmail")]
        public ActionResult<User> GetByEmail(string email)
        {
            var user = _userService.GetByEmail(email);

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
        public IActionResult Update(string id, User userIn)
        {
            var user = _userService.GetByID(id);

            if (user == null)
            {
                return NotFound();
            }

            user.Email = userIn.Email;
            user.Name  = userIn.Name;
            _userService.Update(user._id, user);

            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            var user = _userService.GetByID(id);

            if (user == null)
                return NoContent();

            if(user._id == id){
                _userService.Remove(user._id);
                return Ok(new { deleteStatus = "Successful" });
            } else
                return NoContent();
        }

        [HttpPost("login")]
        public ActionResult<User> Login ([FromBody]User user)
        {   
            if  (user == null)
                return BadRequest("Invalid client request");

            var _user = _userService.GetByEmail(user.Email);

            if(_user == null)
              return NoContent();

            if(user.Email == _user.Email && user.Password == _user.Password)
                return Ok(new { response = "Authorized" } );
            else
              return NoContent();
        }
    }
}