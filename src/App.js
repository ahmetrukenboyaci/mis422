import React from 'react';
import {Route, BrowserRouter, Switch} from "react-router-dom";

/** components **/
import NavigationBar from "./components/NavigationBar/NavigationBar";
import Footer from "./components/Footer/Footer";

/** styles **/
import "./App.scss";

class App extends React.Component {
    render() {
        return (
            <div className={"App"}>
              <BrowserRouter basename={"/"}>
                <NavigationBar />
                  <Switch>
                      <Route path={'/'}>
                        <Footer />
                      </Route>
                  </Switch>
              </BrowserRouter>
            </div>
          );
    }
}

export default App;
