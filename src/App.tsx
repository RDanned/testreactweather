import React from 'react';
import logo from './logo.svg';
import {Provider} from 'react-redux';
import store from './redux/store';
import WeatherCurrent from "./components/WeatherCurrent";
import WeatherWeek from "./components/WeatherCurrent/WeatherWeek";
import './assets/css/general.css';

function App() {
  return (
      <Provider store={store}>
        <WeatherCurrent/>
        <WeatherWeek/>
      </Provider>
  );
}

/*function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}*/

export default App;
