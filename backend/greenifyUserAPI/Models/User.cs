using Microsoft.AspNetCore.Components.Routing;

namespace Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public int Points { get; set; }
        public string MemberSince { get; set; }
        public bool IsLoggedIn { get; set; }
        public string AnimalImageUrl { get; set; }
        public bool IsNightMode { get; set; }
        public int Level {get;set;}

        public User(
            int id,
            string username,
            string password,
            int points,
            string membersince,
            bool isLoggedIn,
            string animalImageUrl,
            bool isNightMode,
            int level
        )
        {
            this.Id = id;
            this.Username = username;
            this.Password = password;
            this.Points = points;
            this.MemberSince = membersince;
            this.IsLoggedIn = isLoggedIn;
            this.AnimalImageUrl = animalImageUrl;
            this.IsNightMode = isNightMode;
            this.Level = level;
        }

        public User() { }
    }

}
