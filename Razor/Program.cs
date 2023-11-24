using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using VendingMachine.Data;
using VendingMachine.Models;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorPages();

if (builder.Environment.IsDevelopment()) {
    builder.Services.AddDbContext<ProductContext>(options =>
        options.UseSqlite(builder.Configuration.GetConnectionString("ProductContext") ?? throw new InvalidOperationException("Connection string 'ProductContext' not found.")));
} else {
    builder.Services.AddDbContext<ProductContext>(options =>
        options.UseSqlServer(builder.Configuration.GetConnectionString("ProductContext") ?? throw new InvalidOperationException("Connection string 'ProductContext' not found.")));
}

var app = builder.Build();

using (var scope = app.Services.CreateScope()) {
    var services = scope.ServiceProvider;
    // Seed the database.
    SeedData.Initialize(services);
}

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapRazorPages();

app.Run();
