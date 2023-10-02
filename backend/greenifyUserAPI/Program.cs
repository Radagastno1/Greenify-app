using System.Security.Cryptography;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddSingleton<webapi.Services.DataServices>();
builder.Services.AddSingleton<webapi.Services.GarbageService>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// builder.Services
//     .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
//     .AddJwtBearer(options =>
//     {
//         options.TokenValidationParameters = new TokenValidationParameters
//         {
//             ValidateIssuer = true,
//             ValidateAudience = true,
//             ValidateLifetime = true,
//             ValidateIssuerSigningKey = true,
//             ValidIssuer = "greenifyUserApi",
//             ValidAudience = "Greenify-app",
//             IssuerSigningKey = new SymmetricSecurityKey(
//                 Encoding.ASCII.GetBytes("JwtSettings:Secret")
//             )
//         };
//     });

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

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
