namespace TodoManager.Models;

public record Todo
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string _id { get; set; }

    [BsonElement("name")]
    public string name { get; set; }
}