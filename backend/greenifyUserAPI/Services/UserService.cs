using Models;
using Newtonsoft.Json;

namespace webapi.Services;

public class DataServices
{
    static string path = "users.json";

    public async Task<IEnumerable<User>> GetUsersAsync()
    {
        try
        {
            var users = await DeserializeUsers();

            if (users == null)
            {
                return new List<User>();
            }
            return users;
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task<User> GetUserByIdAsync(int id)
    {
        try
        {
            var users = await DeserializeUsers();
            var user = users.Find(u => u.Id == id);
            if (user == null)
            {
                return new User();
            }
            user.Points = await GetPoints(id);
            return user;
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task<User> LogInUser(string username, string password)
    {
        try
        {
            var users = await DeserializeUsers();
            var user = users.Find(u => u.Username == username && u.Password == password);
            if (user == null)
            {
                return new User();
            }
            user.Points = await GetPoints(user.Id);
            user.Level = GetLevel(user.Points);
            return user;
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task<int> SaveUserAsync(User user)
    {
        try
        {
            var users = await DeserializeUsers();
            if (users == null)
            {
                users = new();
            }
            int nextId = users.Count > 0 ? users.Max(h => h.Id) + 1 : 1;
            var newUser = new User(
                id: nextId,
                username: user.Username,
                password: user.Password,
                points: user.Points,
                membersince: user.MemberSince,
                animalImageUrl: user.AnimalImageUrl,
                isNightMode: user.IsNightMode,
                level: GetLevel(user.Points)
            );
            users.Add(newUser);
            var serialisedUsers = JsonConvert.SerializeObject(users);
            await File.WriteAllTextAsync(path, serialisedUsers);
            return nextId;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error while saving user: {ex.Message}");
            throw;
        }
    }

    public async Task<User> EditUserAsync(int id, User user)
    {
        try
        {
            var users = await DeserializeUsers();

            var existingUser = users.FirstOrDefault(u => u.Id == id);

            existingUser.Username = user.Username;
            existingUser.Password = user.Password;
            existingUser.Points = await GetPoints(id);
            existingUser.MemberSince = user.MemberSince;
            existingUser.AnimalImageUrl = user.AnimalImageUrl;
            existingUser.IsNightMode = user.IsNightMode;
            existingUser.Level = GetLevel(user.Points);

            var serialisedUsers = JsonConvert.SerializeObject(users);
            await File.WriteAllTextAsync(path, serialisedUsers);

            return existingUser;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error while editing user: {ex.Message}");
            throw;
        }
    }

    public async Task<int> GetPoints(int userId)
    {
        GarbageService garbageService = new();
        var garbageList = await garbageService.GetGarbageByUserIdAsync(userId);
        if (garbageList.Count() > 0)
        {
            var points = garbageList.Sum(g => g.Points);
            return points;
        }
        return 0;
    }

    public int GetLevel(int points)
    {
        if (points <= 1000)
        {
            return 1;
        }
        else if (points <= 2000)
        {
            return 2;
        }
        else if (points <= 3000)
        {
            return 3;
        }
        else if (points <= 4000)
        {
            return 4;
        }
        else
        {
            return 5;
        }
    }

    private async Task<List<User>> DeserializeUsers()
    {
        string jsonString = await File.ReadAllTextAsync(path);
        var users = JsonConvert.DeserializeObject<List<User>>(jsonString);
        return users;
    }
}
