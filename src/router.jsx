import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { AddTask } from './pages/AddTask';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<HomePage />} />
        <Route path="/add" exact element={<AddTask />} />
      </Routes>
    </BrowserRouter>
  );
}
