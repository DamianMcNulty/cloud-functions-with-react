import React, { Component } from "react";
import ReactDOM from "react-dom";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import "./App.css";

import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import { Provider, connect } from "react-redux";

import stateTree from "./state/index";
import Login from "./components/login";

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(stateTree);

export default class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider>
        <Provider store={store}>
          <Login />
        </Provider>
      </MuiThemeProvider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
