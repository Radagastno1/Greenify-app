using Microsoft.Extensions.Configuration.UserSecrets;
using Models;
using Newtonsoft.Json;

namespace webapi.Services;

public class GarbageService
{
    static string path =
        "garbage.json";

    public async Task<IEnumerable<Garbage>> GetGarbageByUserIdAsync(int userId)
    {
        try
        {
            string jsonString = await File.ReadAllTextAsync(path);

            if (string.IsNullOrWhiteSpace(jsonString))
            {
                return new List<Garbage>();
            }

            var garbages = JsonConvert.DeserializeObject<List<Garbage>>(jsonString);

            // Filtrera garbage-objekt baserat på användar-ID
            var garbageByUserId = garbages.FindAll(g => g.UserId == userId);

            if (garbageByUserId == null)
            {
                return new List<Garbage>();
            }

            return garbageByUserId;
        }
        catch (Exception e)
        {
            Console.WriteLine("ex i servicen:" + e.Message);
            throw;
        }
    }

    public async Task<Garbage> CreateGarbage(Garbage garbage)
    {
        try
        {
            var garbageList = await DeserializeGarbage();
            if (garbageList == null)
            {
                garbageList = new List<Garbage>();
            }

            int id = DateTime.Now.Millisecond;

            Garbage newGarbage = new Garbage(
                id,
                garbage.UserId,
                garbage.Url,
                garbage.Material,
                garbage.Latitude,
                garbage.Longitude,
                garbage.Date,
                GeneratePointsByMaterial(garbage.Material)
            );

            garbageList.Add(newGarbage);

            var userDataService = new DataServices(); // Skapa en instans av DataServices
            var user = await userDataService.GetUserByIdAsync(garbage.UserId);
            if (user != null)
            {
                user.Points += garbage.Points;
                user.Level = userDataService.GetLevel(user.Points);
                await userDataService.EditUserAsync(user.Id, user); // Uppdatera användaren
            }

            var serialisedGarbage = JsonConvert.SerializeObject(garbageList);
            await File.WriteAllTextAsync(path, serialisedGarbage);

            return newGarbage;
        }
        catch (Exception e)
        {
            Console.WriteLine(e.Message);
            throw;
        }
    }

    public int GeneratePointsByMaterial(string material)
    {
        switch (material)
        {
            case "plast":
                return 800;
            case "metall":
                return 1500;
            case "aluminium":
                return 1000;
            case "glas":
                return 500;
            case "tuggummi":
                return 200;
            case "snus":
                return 200;
            case "fimp":
                return 200;
            case "våtservett":
                return 200;
            case "papper":
                return 100;
        }
        return 0;
    }

    private async Task<List<Garbage>> DeserializeGarbage()
    {
        string jsonString = await File.ReadAllTextAsync(path);

        if (string.IsNullOrWhiteSpace(jsonString))
        {
            return new List<Garbage>();
        }

        var garbages = JsonConvert.DeserializeObject<List<Garbage>>(jsonString);
        return garbages ?? new List<Garbage>();
    }
}
