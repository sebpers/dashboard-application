using AuthECApi.Extensions;
using AuthECApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

builder.Services.AddSwaggerExplorer()
    .InjectDbContext(builder.Configuration)
    .AddAppConfig(builder.Configuration)
    .AddIdentityHandlersAndStores()
    .ConfigureIdentityOptions()
    .AddIdentityAuth(builder.Configuration);

var app = builder.Build();

app.ConfigureSwaggerExplorer()
    .ConfigCORS(builder.Configuration)
    .AddIdentityAuthMiddlewares();

app.MapControllers();

app
    .MapGroup("/api")
    .MapIdentityApi<AppUser>();

// Fix seeded roles (Admin, Teacher and Student)
//using (var scope = app.Services.CreateScope())
//{
//    var services = scope.ServiceProvider;
//    try
//    {
//        await SeedData.SeedRoles(services);
//        await SeedData.SeedUsers(services);
//    }
//    catch (Exception ex)
//    {
//        Console.WriteLine(ex.Message);
//    }
//}

app.Run();