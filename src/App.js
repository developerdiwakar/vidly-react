import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import auth from "./services/authService";
import ProtectedRoute from "./components/common/protectedRoute";
import MovieForm from "./components/movieForm";
import CustomerForm from "./components/customerForm";
import Movies from "./components/movies";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import NavBar from "./components/navBar";
import LoginForm from "./components/loginForm";
import Logout from "./components/logout";
import Profile from "./components/profile";
import RegisterForm from "./components/registerForm";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";

class App extends React.Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }
  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={user} />
        <main className="container">
          <Switch>
            <ProtectedRoute
              path="/movies/:id"
              component={MovieForm}
            ></ProtectedRoute>
            <Route
              path="/movies"
              render={(props) => <Movies {...props} user={user} />}
            ></Route>
            <ProtectedRoute
              path="/customers/:id"
              component={CustomerForm}
            ></ProtectedRoute>
            <ProtectedRoute
              path="/customers"
              render={(props) => <Customers {...props} user={user} />}
            ></ProtectedRoute>
            <Route path="/rentals" component={Rentals}></Route>
            <Route path="/not-found" component={NotFound}></Route>
            <Route path="/register" component={RegisterForm}></Route>
            <ProtectedRoute
              path="/profile"
              component={Profile}
            ></ProtectedRoute>
            <Route path="/login" component={LoginForm}></Route>
            <Route path="/logout" component={Logout}></Route>
            <Redirect exact from="/" to="/movies"></Redirect>
            <Redirect to="/not-found"></Redirect>
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
