import React from 'react';
import './App.css';
import {Pane, Tab, Tablist} from 'evergreen-ui';

function App() {
  return (
    <div className="App">
      <Pane width="100%" height="50px" padding="10px" alignItems="center" display="flex">
        <Tablist>
          <Tab height={30} fontSize={20}>The PVT</Tab>
          <Tab height={30} fontSize={20}>What's going on?</Tab>
        </Tablist>
      </Pane>
    </div>
  );
}

export default App;
