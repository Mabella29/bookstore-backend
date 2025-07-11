using System.ComponentModel;
using System.Data.Common;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;
using WebApplication1.Entities;
using Microsoft.AspNetCore.Authorization;


namespace WebApplication1.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly DataContext _context;

        public BookController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Book>>> GetAllBooks()
        {
            var books = await _context.Books.ToListAsync();
            return Ok(books);
        }

        // GET with id
        [HttpGet("{id}")]
        public async Task<ActionResult<Book>> GetBook(int id)
        {
            var book = await _context.Books.FindAsync(id);
            if (book is null)
                return NotFound("Book not found");
            return Ok(book);
        }

        // POST
        [HttpPost]
        public async Task<ActionResult<Book>> AddBook(Book book)
        {
            _context.Books.Add(book);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetBook), new { id = book.BookId }, book);
        }

        // Update a specific book
        [HttpPut("{id}")]
        public async Task<ActionResult<List<Book>>> UpdateBook(int id, Book updatedBook)
        {
            var dbBook = await _context.Books.FindAsync(id);
            if (dbBook is null)
                return NotFound("Book not found");

            dbBook.Name = updatedBook.Name;
            dbBook.Category = updatedBook.Category;
            dbBook.Price = updatedBook.Price;
            dbBook.Description = updatedBook.Description;

            await _context.SaveChangesAsync();

            return Ok(await _context.Books.ToListAsync());
        }

        // DELETE with id
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBook(int id)
        {
            var book = await _context.Books.FindAsync(id);
            if (book == null)
                return NotFound("Book not found");

            _context.Books.Remove(book);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
