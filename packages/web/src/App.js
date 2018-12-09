import React, { Component } from "react";
import { ThemeProvider } from "styled-components";

import "./App.css";
import theme from "./components/theme";
import FullEditor from "./components/editor/Editor";

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <FullEditor />
      </ThemeProvider>
    );
  }
}

export default App;
