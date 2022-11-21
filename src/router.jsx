import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Loading } from './components'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import { HomePage, AddTask, EditTask, LoginPage, FinishPage, DeletedPage } from './pages';

export default function AppRouter() {
  const [user, loading] = useAuthState(auth);
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
        <Route path="/edit" exact element={<EditTask />} />
        <Route path="/finish" exact element={<FinishPage />} />
        <Route path="/delete" exact element={<DeletedPage />} />
      </Routes>
    </BrowserRouter>
  );
}
