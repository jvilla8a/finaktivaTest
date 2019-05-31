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

        [HttpPost("[action]/{email}/{pass}")]
        public ActionResult<User> Login (string email, string pass)
        {
            var user = _userService.Get(email);
            if (user.Password == pass){
                return user;
            } else {
                return NotFound();
            }
        }
    }
}