import React, { useEffect, useState } from 'react';
import { getBooks } from '../services/api';
import BookForm from '../components/BookForm';
import BookCard from '../components/BookCard';

export default function Dashboard() {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    const data = await getBooks();
    setBooks(data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">📚 Book Store Dashboard</h1>
      <BookForm refresh={fetchBooks} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {books.map(book => (
          <BookCard key={book.bookId} book={book} refresh={fetchBooks} />
        ))}
      </div>
    </div>
  );
}
