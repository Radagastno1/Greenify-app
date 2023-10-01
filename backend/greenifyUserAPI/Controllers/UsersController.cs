using System;
using System.Security.Claims;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Models;
using webapi.Services;
using Microsoft.AspNetCore.Authorization;

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

    // [HttpGet("all")]
    // public async Task<ActionResult<IEnumerable<User>>> GetUsers()
    // {
    //     try
    //     {
    //         var users = await _dataServices.GetUsersAsync();
    //         return Ok(users);
    //     }
    //     catch (Exception)
    //     {
    //         return StatusCode(500);
    //     }
    // }

    [Authorize]
    [HttpGet]
    public async Task<ActionResult<User>> GetUserById()
    {
        try
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);

            if (userIdClaim != null && int.TryParse(userIdClaim.Value, out int userId))
            {
                var user = await _dataServices.GetUserByIdAsync(userId);
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
    public async Task<IActionResult> LogInUser([FromBody] LoginModel model)
    {
        try
        {
            Console.WriteLine("login user anropas");
            var user = await _dataServices.LogInUser(model.Username, model.Password);
            Console.WriteLine("user hittas från json: " + user.Username);

            if (user != null && !string.IsNullOrEmpty(user.Username))
            {
                Console.WriteLine("kommmer in i if satsen i login user om inte useer är null");
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(_configuration["JwtSettings:Secret"]);

                Console.WriteLine("key: " + key);

                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(
                        new Claim[]
                        {
                            new Claim(ClaimTypes.Name, user.Username),
                            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
                        }
                    ),
                    Expires = DateTime.UtcNow.AddHours(1),
                    SigningCredentials = new SigningCredentials(
                        new SymmetricSecurityKey(key),
                        SecurityAlgorithms.HmacSha256Signature
                    )
                };

                var token = tokenHandler.CreateToken(tokenDescriptor);
                var tokenString = tokenHandler.WriteToken(token);

                Console.WriteLine("token som returneras: " + tokenString);

                return Ok(new { Token = tokenString });
            }
            else
            {
                return Unauthorized();
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine("exception i login: " + ex.Message);
            return StatusCode(500, ex.Message);
        }
    }

    // [HttpPost("login")]
    // public async Task<IActionResult> LogInUser([FromBody] LoginModel model)
    // {
    //     try
    //     {
    //         Console.WriteLine("login user anropas");
    //         var user = await _dataServices.LogInUser(model.Username, model.Password);
    //         Console.WriteLine("user hämtas från json: " + user);

    //         if (user != null && !string.IsNullOrEmpty(user.Username))
    //         {
    //             return Ok(user);
    //         }
    //         else
    //         {
    //             return Unauthorized();
    //         }
    //     }
    //     catch (Exception ex)
    //     {
    //         return StatusCode(500, ex.Message);
    //     }
    // }

    [Authorize]
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
