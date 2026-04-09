import logo from './logo.svg';
import './App.css';
import EventMgmtCard from "./EventMgmtCard";

//based on ..\client\App.js for parity
function App() {
  return (
    <div className="App">
      <header class="header">
        <nav class="header-menu">
          <ul class="header-menu__list">
            <li class="header-menu__list-item">Current</li>
            <li class="header-menu__list-item">Previous</li>
            <li class="header-menu__list-item">Create</li>
          </ul>
        </nav>
      </header>

      <section className="main">
        <EventMgmtCard />
      </section>
    </div>
  );
}

export default App;
