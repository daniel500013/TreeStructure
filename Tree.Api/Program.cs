using Microsoft.EntityFrameworkCore;
using System.Runtime.CompilerServices;
using Tree.Api;
using Tree.Api.Service;

[assembly: InternalsVisibleTo("Tree.Tests")]

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<TreeDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DbConnectionString")));

// Add services to the container.
builder.Services.AddScoped<TreeService>();

builder.Services.AddControllers();
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

app.UseHttpsRedirection();

app.UseAuthorization();
app.UseCors(x => x.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());

app.MapControllers();

app.Run();
