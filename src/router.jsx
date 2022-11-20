import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage, AddTask, LoginPage, ItemPage } from './pages';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/view" element={<ItemPage />} />
        <Route path="/add" element={<AddTask />} />
      </Routes>
    </BrowserRouter>
  );
}
