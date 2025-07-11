import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import BookForm from './components/BookForm';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/book/new" element={<BookForm />} />
        <Route path="/book/edit/:id" element={<BookForm />} />
      </Routes>
    </BrowserRouter>
  );
}
