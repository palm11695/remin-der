import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AddTask, HomePage } from './pages/HomePage';

export default function AppRouter() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path="/" exact element={<HomePage />} />
      <Route path="/addtask" exact element={<AddTask />} />
    </Routes>
  </BrowserRouter>
  );
}
