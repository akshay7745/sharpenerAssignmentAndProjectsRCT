import logo from "./logo.svg";
import "./App.css";
import Asyncfile from "./components/Asyncfile";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <h2>grow bro grow</h2>
      </header>
      <Asyncfile />
    </div>
  );
}

export default App;
