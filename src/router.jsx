import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { AddTask } from './pages/AddTask';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { FinishPage } from './pages/FinishTask';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<HomePage />} />
        <Route path="/add" exact element={<AddTask />} />
        <Route path="/login" exact element={<LoginPage />} />
        <Route path="/finish" exact element={<FinishPage />} />
        
      </Routes>
    </BrowserRouter>
  );
}
