import { useState, useEffect } from 'react';
import { createBook, updateBook } from '../services/api';

export default function BookForm({ selectedBook = null, refresh }) {
  const [form, setForm] = useState({
    name: '',
    category: '',
    price: '',
    description: '',
  });

  useEffect(() => {
    if (selectedBook) {
      setForm({
        name: selectedBook.name,
        category: selectedBook.category,
        price: selectedBook.price,
        description: selectedBook.description,
      });
    }
  }, [selectedBook]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedBook) {
      await updateBook(selectedBook.bookId, form);
    } else {
      await createBook(form);
    }

    setForm({ name: '', category: '', price: '', description: '' });
    refresh();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded px-6 py-4"
    >
      <h2 className="text-lg font-semibold mb-4">
        {selectedBook ? 'Update Book' : 'Add a New Book'}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          placeholder="Book Name"
          value={form.name}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
      </div>

      <button
        type="submit"
        className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        {selectedBook ? 'Update Book' : 'Add Book'}
      </button>
    </form>
  );
}
