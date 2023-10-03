# Använd .NET Core som grund
FROM mcr.microsoft.com/dotnet/aspnet

# Ange arbetskatalogen inuti containern
WORKDIR /app

# Kopiera den byggda .NET Core-applikationen till containern
COPY ./bin/Release/net7.0/publish .

# Ange kommandot som körs när containern startas
ENTRYPOINT ["dotnet", "greenifyUserAPI.dll"]
