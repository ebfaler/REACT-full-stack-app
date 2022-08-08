import logo from './logo.svg';
import './App.css';

function App() {


// testing that local host can retreiev courses from host 5000
fetch("http://localhost:5000/api/courses")
.then(res => res.json())
.then((resData) => {
console.log(resData);
})

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
        </a>
      </header>
    </div>
  );
}

export default App;
