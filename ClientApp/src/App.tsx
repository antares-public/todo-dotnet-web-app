import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { AboutPage } from "./pages/AboutPage";
import { TodosPage } from "./pages/TodosPage";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container">
        <Switch>
          <Route component={TodosPage} path="/todo" exact />
          <Route component={AboutPage} path="/about" />
          <Redirect path="*" to="/todo" />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
