using System.ComponentModel.DataAnnotations;
using Models;
using Newtonsoft.Json;

public class Garbage
{
    public int Id { get; set; }

    public int UserId { get; set; }

    public string? Url { get; set; }

    public string? Material { get; set; }
    public double Latitude {get;set;}
    public double Longitude {get;set;}

    public string? Date { get; set; }

    public int Points { get; set; }

    public Garbage() { }

    public Garbage(
        int id,
        int userId,
        string url,
        string material,
        double latitude,
        double longitude,
        string date,
        int points
    )
    {
        Id = id;
        UserId = userId;
        Url = url;
        Material = material;
        Latitude = latitude;
        Longitude = longitude;
        Date = date;
        Points = points;
    }
}

