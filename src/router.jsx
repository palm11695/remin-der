import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Loading from '../src/components/Loading';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import { HomePage, AddTask, LoginPage, FinishPage } from './pages';

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
