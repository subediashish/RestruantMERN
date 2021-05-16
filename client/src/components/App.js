import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./Header";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import NotFound from "./NotFound";
import Home from "./Home";

const App = () => (
  <BrowserRouter>
    <Header />
    <main>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/SignUp" component={SignUp} />
        <Route exact path="/SignIn" component={SignIn} />
        <Route component={NotFound} />
      </Switch>
    </main>
  </BrowserRouter>
);

export default App;
