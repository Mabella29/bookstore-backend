import { deleteBook } from '../services/api';

export default function BookCard({ book, onEdit, refresh }) {
  const handleDelete = async () => {
    if (confirm(`Are you sure you want to delete "${book.name}"?`)) {
      await deleteBook(book.bookId);
      refresh();
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-xl font-bold mb-2">{book.name}</h2>
      <p className="text-gray-600">{book.description}</p>
      <p className="text-sm mt-1">Category: {book.category}</p>
      <p className="text-green-700 font-bold mb-4">₵{book.price}</p>
      <div className="flex gap-3">
        <button
          onClick={() => onEdit(book)}
          className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
