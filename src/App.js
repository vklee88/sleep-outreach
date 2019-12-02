import React, { Component } from 'react';
import './App.css';
import {Pane, Tab, Tablist} from 'evergreen-ui';
import PVT from './PVT';
import Discussion from "./Discussion";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
      components: [<PVT />, <Discussion />]
    };
  }

  render() {
    return (
      <div className="App">
        <Pane width="100%" height="45px" padding="10px" alignItems="center" display="flex" borderBottom="1px solid #40404055 ">
          <Tablist>
            <Tab height={30} fontSize={20} onSelect={() => this.setState({ selectedIndex: 0 })}>
              The PVT
            </Tab>
            <Tab height={30} fontSize={20} onSelect={() => this.setState({ selectedIndex: 1 })}>
              What's going on?
            </Tab>
          </Tablist>
        </Pane>
        <Pane width="100%" height="100%" paddingLeft={20}>
        {this.state.components[this.state.selectedIndex]}
        </Pane>
      </div>
    );
  }
}

export default App;
