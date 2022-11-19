import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Loading from '../src/components/Loading';
import { HomePage } from './pages/HomePage';
import { AddTask } from './pages/AddTask';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { FinishPage } from './pages/FinishTask';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';

export default function AppRouter() {
  const [user, loading, error] = useAuthState(auth);
  if (loading) {
    return <Loading />
  }
  if (!user){
    return <LoginPage />
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<HomePage />} />
        <Route path="/add" exact element={<AddTask />} />
        <Route path="/finish" exact element={<FinishPage />} />
      </Routes>
    </BrowserRouter>
  );
}
