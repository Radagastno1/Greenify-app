using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.IO;
using fileIO = System.IO.File;

[Route("api/facts")]
[ApiController]
public class FactsController : ControllerBase
{
    private readonly ILogger<FactsController> _logger;

    public FactsController(ILogger<FactsController> logger)
    {
        _logger = logger;
    }

    // GET: api/Facts
    [HttpGet]
    public async Task<ActionResult<MaterialInfo>> GetFacts()
    {
        try
        {
            string path = "facts.json";
            string jsonString = await fileIO.ReadAllTextAsync(path);
            var materialInfos = JsonConvert.DeserializeObject<List<MaterialInfo>>(jsonString);
            Random random = new();
            int randomNr = random.Next(1, materialInfos.Count);
            MaterialInfo info = new();

            try
            {
                info = materialInfos.Find(f => f.Id == randomNr);
            }
            catch (InvalidOperationException)
            {
                randomNr = random.Next(0, materialInfos.Count);
            }
            return Ok(info);
        }
        catch (Exception e)
        {
            _logger.LogError(e, "An error occurred while processing the request.");
            throw;
        }
    }

    [HttpGet("{material}")]
    public async Task<ActionResult<MaterialInfo>> GetByMaterial(string material)
    {
        try
        {
            Console.WriteLine("INNE I GETBY");
            string path = "facts.json";
            string jsonString = await fileIO.ReadAllTextAsync(path);
            var materialInfos = JsonConvert.DeserializeObject<List<MaterialInfo>>(jsonString);
            MaterialInfo materialInfo = new();

            try
            {
                if (materialInfos != null)
                {
                    materialInfo = materialInfos.Find(f => f.Material == material.ToLower());
                    Console.WriteLine("materialinfo material found:" + materialInfo.Material);
                }
            }
            catch (InvalidOperationException) { }
            return Ok(materialInfo);
        }
        catch (Exception e)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
        }
    }
}
