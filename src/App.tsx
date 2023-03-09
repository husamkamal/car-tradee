import { Outlet } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import NavBar from './components/NavBar';
import { UserInfoProvider, SnackBarProvider } from './contexts';

function App() {
  return (
    <div>
      <SnackBarProvider>
        <CookiesProvider>
          <UserInfoProvider>
            <NavBar />
            <Outlet />
          </UserInfoProvider>
        </CookiesProvider>
      </SnackBarProvider>
    </div>
  );
}

export default App;
