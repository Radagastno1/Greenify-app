using Microsoft.AspNetCore.Mvc;
using Models;
using webapi.Services;

namespace webapi.Controllers;

[ApiController]
[Route("users")]
public class UserController : ControllerBase
{
    private readonly DataServices _dataServices;
    private readonly IConfiguration _configuration;

    public UserController(DataServices dataServices, IConfiguration configuration)
    {
        _dataServices = dataServices;
        _configuration = configuration;
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<User>> GetUserById(int id)
    {
        try
        {

            if (id > 0)
            {
                var user = await _dataServices.GetUserByIdAsync(id);
                if (user == null)
                {
                    return NotFound();
                }
                Console.WriteLine("user som returneras från auth get user:" + user.Username);
                return Ok(user);
            }
            else
            {
                return BadRequest("Ogiltig JWT-token");
            }
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
    public async Task<ActionResult<User>> LogInUser([FromBody] LoginModel model)
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
            return StatusCode(500, ex.Message);
        }
    }

    // [Authorize]
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
