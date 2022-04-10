namespace TodoManager.Models;

public record Todo
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string _id { get; set; }

    [BsonElement("title")]
    public string title { get; set; }

    [BsonElement("completed")]
    public bool completed { get; set; }
}