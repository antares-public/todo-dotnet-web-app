namespace TodoManager.Services;

public class TodoService
{
    private readonly IMongoCollection<Todo> _tasks;

    public TodoService(IOptions<TodoDatabaseSettings> options)
    {
        var mongoClient = new MongoClient(options.Value.ConnectionString);


        _tasks = mongoClient
            .GetDatabase(options.Value.DatabaseName)
            .GetCollection<Todo>(options.Value.CollectionName);
    }

    public async Task<List<Todo>> GetAll() =>
        await _tasks.Find(_ => true).ToListAsync();

    public async Task<Todo> Get(string id) =>
        await _tasks.Find(s => s._id == id).FirstOrDefaultAsync();

    public async Task Create(Todo task) =>
        await _tasks.InsertOneAsync(task);

    public async Task Update(string id, Todo task) =>
        await _tasks.ReplaceOneAsync(s => s._id == id, task);

    public async Task Delete(string id) =>
        await _tasks.DeleteOneAsync(s => s._id == id);
}