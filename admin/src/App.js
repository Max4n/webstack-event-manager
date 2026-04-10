import logo from './logo.svg';
import './App.css';
import EventMgmtCard from "./EventMgmtCard";
import EventMgmtDetails from "./EventMgmtDetails";

//based on ..\client\App.js for parity
function App() {

  var path = window.location.pathname;

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
        { path == "/" &&
        <EventMgmtCard />
        }
        { path == "/details" &&
        <EventMgmtDetails />
        }
      </section>
    </div>
  );
}

export default App;
