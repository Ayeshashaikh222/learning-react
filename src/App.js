import React, { useContext } from 'react';
// import Login from './components/Login/Login';
// import Home from './components/Home/Home';
// import MainHeader from './components/MainHeader/MainHeader';
import Login from './Login/Login';
import Home from './Home/Home';
import MainHeader from './MainHeader/MainHeader';
import AuthContext from './context/auth-context';


function App() {

  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect(() => {
  //   const storeUserLoggedInInformation = localStorage.getItem('isLoggedIn');

  //   if (storeUserLoggedInInformation === '1') {
  //     setIsLoggedIn(true);
  //   }
  // }, []);


  // const loginHandler = (email, password, collegeName) => {
  //   // We should of course check email and password
  //   // But it's just a dummy/ demo anyways
  //   localStorage.setItem('isLoggedIn', '1');
  //   setIsLoggedIn(true);
  // };

  // const logoutHandler = () => {
  //   localStorage.removeItem('isLoggedIn');
  //   setIsLoggedIn(false);
  // };

  const ctx = useContext(AuthContext);

  return (

    <React.Fragment>
      <MainHeader />
      <main>
        {!ctx.isLoggedIn && <Login />}
        {ctx.isLoggedIn && <Home />}
      </main>
      </React.Fragment>
   

  );
}

export default App;
