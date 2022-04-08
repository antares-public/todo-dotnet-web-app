var builder = WebApplication.CreateBuilder(args);

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

builder.Services.AddCors(options =>
{
  options.AddPolicy(name: MyAllowSpecificOrigins,
                    policy =>
                    {
                      policy.WithOrigins("https://localhost:44464");
                    });
});

RegisterServices(builder.Services);

var app = builder.Build();

ConfigureApp(app);

app.Run();

void RegisterServices(IServiceCollection services)
{
  services.Configure<TodoDatabaseSettings>(builder.Configuration.GetSection("TodoDatabaseSettings"));
  services.AddSingleton<TodoService>();

  services.AddControllers();
  services.AddEndpointsApiExplorer();
  services.AddSwaggerGen(c =>
  {
    c.SwaggerDoc("v1", new OpenApiInfo
    {
      Title = "Contacts API",
      Description = "Storing and sharing contacts",
      Version = "v1"
    });
  });
}

void ConfigureApp(WebApplication app)
{
  // Configure the HTTP request pipeline.
  if (app.Environment.IsDevelopment())
  {
    app.UseSwagger();
    app.UseSwaggerUI();
  }

  app.UseHttpsRedirection();
  app.UseStaticFiles();
  app.UseRouting();

  app.UseAuthorization();

  app.MapFallbackToFile("index.html");

  app.MapControllers();

  app.UseCors(MyAllowSpecificOrigins);

  app.MapGet("/api/tasks", async (TodoService service)
      => await service.GetAll());

  app.MapGet("/api/tasks/{id}", async (TodoService service, string id)
      => await service.Get(id));

  app.MapPost("/api/tasks", async (TodoService service, Todo task) =>
  {
    await service.Create(task);
    return Results.Created($"/todo/{task._id}", task);
  });

  app.MapPut("/api/tasks/{id}", async (TodoService service, string id, Todo updateTask) =>
  {
    var task = await service.Get(id);

    if (task is null)
      return Results.NotFound();

    updateTask._id = task._id;

    await service.Update(id, updateTask);

    return Results.NoContent();
  });

  app.MapDelete("/api/tasks/{id}", async (TodoService service, string id) =>
  {
    var task = await service.Get(id);

    if (task is null) return Results.NotFound();

    await service.Delete(id);

    return Results.NotFound();
  });
}