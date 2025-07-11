namespace WebApplication1.Entities
{
    public class Book
    {
        public int BookId { get; set; }
        public required string Name { get; set; } = default!;
        public string Category { get; set; } = default!;
        public decimal Price { get; set; }
        public string? Description { get; set; }
    }
}
