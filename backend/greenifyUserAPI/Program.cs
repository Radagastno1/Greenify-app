using System.Security.Cryptography;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddSingleton<webapi.Services.DataServices>();
builder.Services.AddSingleton<webapi.Services.GarbageService>();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// //generar en secret key till consolen
// var randomBytes = new byte[32];
// using (var rng = new RNGCryptoServiceProvider())
// {
//     rng.GetBytes(randomBytes);
// }

// // Konvertera bytes till en sträng (hexadecimal representation)
// var key = BitConverter.ToString(randomBytes).Replace("-", "").ToLower();

// Console.WriteLine("Slumpmässig nyckel: " + key);

app.UseCors(builder =>
{
    builder.WithOrigins("http://192.168.50.201:19000").AllowAnyHeader().AllowAnyMethod();
});

app.UseAuthorization();

app.MapControllers();

app.Run();
