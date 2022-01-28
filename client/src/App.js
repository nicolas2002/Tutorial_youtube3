import { useState, useEffect } from "react";
import './App.css';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Home from './pages/Home';
import CreateProduct from './pages/CreateProduct';
import Product from './pages/Product';
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import { AuthContext } from "./helpers/AuthContext";
import axios from "axios";
import { removeUserCookies, getCookie } from './helpers/cookies';
import PageNotFound from "./pages/PageNotFound";
import Profile from "./pages/Profile";

axios.defaults.withCredentials = true;

function App() {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });

  useEffect(() => {
    const accessToken = getCookie('accessToken');
    if(!!accessToken) {
    axios
      .get("http://localhost:3001/auth/auth", {
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          console.log(response);
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
        }
      });
    }
  }, []);

  const logout = () => {
    removeUserCookies();
    axios.get("http://localhost:3001/auth/deleteCookie", { withCredentials: true }).then((response) => {console.log(response)});
    setAuthState({ username: "", id: 0, status: false });
  };

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <div className="navbar">
            {!authState.status ? (
              <>
                <Link to="/login"> Login</Link>
                <Link to="/registration"> Registration</Link>
              </>
            ) : (
              <>
                <Link to="/createproduct"> Create A Product</Link>
                <Link to="/home"> Home Page</Link>
              </>
            )}
             <div className="loggedInContainer">
              <h1>{authState.username} </h1>
              {authState.status && <button onClick={logout}> Logout</button>}
            </div>
          </div>
          <Switch>
            <Route path="/home"  component={() => <Home/>} />
            <Route path="/createproduct"  component={() => <CreateProduct/>} />
            <Route path="/product/:id" component={() => <Product/>} />
            <Route path="/registration"  component={() => <Registration/>} />
            <Route path="/login"  component={() => <Login/>} />
            <Route path="/profile/:id"  component={() => <Profile/>} />
            <Route path="*"  component={() => <PageNotFound/>} />
          </Switch>
        </Router> 
      </AuthContext.Provider>
    </div>
  );
}

export default App;
