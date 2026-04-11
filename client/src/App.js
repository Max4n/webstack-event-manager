import './App.css';
import EventCard from './EventCard';

function App() {
  return (
    <div className="App">
      <header className="header">
        <div className="header__inner">
          <nav className='header-menu'>
            <ul className='menu__list'>
              <li className='menu__list-item'>
                <a href="#" className="menu__list-link">Home</a>
              </li>
              <li className='menu__list-item'>
                <a href="#" className="menu__list-link">Registred</a>
              </li>
              <li className='menu__list-item'>
                <a href="#" className="menu__list-link">Interested</a>
              </li>
              <li className='menu__list-item'>
                <a href="#" className="menu__list-link">Help</a>
              </li>
            </ul>
          </nav>
          <input type="text" placeholder="Search..."className="header-search" />
          </div>
      </header>


        <section className="main">
          <EventCard></EventCard>
        </section>
      </div>
  );
}

export default App;
