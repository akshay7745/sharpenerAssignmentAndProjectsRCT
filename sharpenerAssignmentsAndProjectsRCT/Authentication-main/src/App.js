import { Switch, Route, Redirect } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import { useContext } from "react";
import authContext from "./contexts/authContext/authContext";
function App() {
  const { isAuthenticated } = useContext(authContext);

  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/auth">
          <AuthPage />
        </Route>

        {/* {isAuthenticated&&  <Route path='/profile'>
          <UserProfile />
        </Route>} */}
        <Route path="/profile">
          {isAuthenticated && <UserProfile />}
          {!isAuthenticated && <Redirect to="/auth" />}
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
