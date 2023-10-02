using Microsoft.AspNetCore.Mvc;
using webapi.Services;
using System.Text;


namespace webapi.Controllers;

[Route("garbage")]
public class GarbageController : ControllerBase
{
    private readonly GarbageService _garbageService;

    public GarbageController(GarbageService garbageService)
    {
        _garbageService = garbageService;
    }

    [HttpGet("{userId:int}")]
    public async Task<ActionResult<IEnumerable<Garbage>>> GetGarbageByUserId(int userId)
    {
        try
        {
            Console.WriteLine("inne i try i get garbage");
            var garbage = await _garbageService.GetGarbageByUserIdAsync(userId);
            Console.WriteLine("garabage i try:" + garbage.Count() + "st");
            return Ok(garbage);
        }
        catch (Exception)
        {
            return StatusCode(500);
        }
    }

    [HttpPost("create")]
    public async Task<ActionResult> PostGarbage([FromBody] Garbage garbage)
    {
        string requestBody = null;
        using (var reader = new StreamReader(HttpContext.Request.Body, Encoding.UTF8))
        {
            requestBody = await reader.ReadToEndAsync();
        }

        Console.WriteLine($"Received garbage: {requestBody}");

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
            var newGarbage = await _garbageService.CreateGarbage(garbage);
            Console.WriteLine("garbage skapat:" + newGarbage.Id);
            return Ok(newGarbage);
        }
        catch (Exception)
        {
            return StatusCode(500);
        }
    }
}
