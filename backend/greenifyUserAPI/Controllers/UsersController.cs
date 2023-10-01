using Microsoft.AspNetCore.Mvc;
using Models;
using webapi.Services;

namespace webapi.Controllers;

[ApiController]
[Route("users")]
public class UserController : ControllerBase
{
    private readonly DataServices _dataServices;

    public UserController(DataServices dataServices)
    {
        _dataServices = dataServices;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<User>>> GetUsers()
    {
        try
        {
            var users = await _dataServices.GetUsersAsync();
            return Ok(users);
        }
        catch (Exception)
        {
            return StatusCode(500);
        }
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<User>> GetUserById(int id)
    {
        try
        {
            var user = await _dataServices.GetUserByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }
        catch (Exception)
        {
            return StatusCode(500);
        }
    }

    [HttpPost("create")]
    public async Task<ActionResult> PostUser(User user)
    {
        try
        {
            Console.WriteLine("Vi är i try i post user");
            var newUserId = await _dataServices.SaveUserAsync(user);
            Console.WriteLine("id skapat:" + newUserId);
            var userCreated = await _dataServices.GetUserByIdAsync(newUserId);
            return Ok(userCreated);
        }
        catch (Exception)
        {
            return StatusCode(500);
        }
    }

    [HttpPost("login")]
    public async Task<IActionResult> LogInUser([FromBody] LoginModel model)
    {
        try
        {
            Console.WriteLine("login user anropas");
            var user = await _dataServices.LogInUser(model.Username, model.Password);
            Console.WriteLine("user hämtas från json: " + user);

            if (user != null && !string.IsNullOrEmpty(user.Username))
            {
                return Ok(user);
            }
            else
            {
                return Unauthorized();
            }
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message); // Hantera eventuella fel och returnera 500 Internal Server Error
        }
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<User>> EditUser(int id, [FromBody] User user)
    {
        if (!ModelState.IsValid)
        {
            foreach (var entry in ModelState.Values)
            {
                foreach (var error in entry.Errors)
                {
                    Console.WriteLine($"Error: {error.ErrorMessage}");
                }
            }
            return BadRequest(ModelState);
        }

        try
        {
            // updatedUser.Id = id;
            var updatedUser = await _dataServices.EditUserAsync(id, user);

            if (updatedUser != null)
            {
                return Ok(updatedUser);
            }
            else
            {
                return NotFound();
            }
        }
        catch (Exception)
        {
            return StatusCode(500);
        }
    }
}
