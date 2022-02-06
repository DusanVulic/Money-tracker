import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./Pages/home/Home";
import Login from "./Pages/login/Login";
import SignUp from "./Pages/signup/SignUp";

import { useAuthContext } from "./Hooks/useAuthContext";

function App() {
  const { authIsReady, user } = useAuthContext();

  return (
    <div className="App">
      {authIsReady && (
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/">
              {!user && <Redirect to="/login" />}
              {user && <Home />}
            </Route>
            <Route path="/login">
              {user && <Redirect to="/" />}
              {!user && <Login />}
            </Route>
            <Route path="/signup">
              {user && <Redirect to="/" />}
              {!user && <SignUp />}
            </Route>
          </Switch>
        </Router>
      )}
    </div>
  );
}

export default App;
