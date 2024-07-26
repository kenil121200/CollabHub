import { LoginPage, NavBar, HomePage } from './components';
import { useAuth } from './context/AuthContext';

function App() {
  const { isAuthenticated } = useAuth();


  return (
    <>
      <NavBar/>
      {isAuthenticated ? <HomePage /> : <LoginPage/>}
    </>
  );
}

export default App;