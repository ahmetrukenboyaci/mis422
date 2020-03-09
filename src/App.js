import React from 'react';
import {Route, BrowserRouter, Switch} from "react-router-dom";

/** components **/
import NavigationBar from "./components/NavigationBar/NavigationBar";

/** styles **/
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter basename={"/"}>
          <Switch>
              <Route exact path={'/'}>
                  <NavigationBar />
              </Route>
          </Switch>
      </BrowserRouter>
      {/*<NavigationBar />*/}
    </div>
  );
}

export default App;
