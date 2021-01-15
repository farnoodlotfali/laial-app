import React from 'react';
import './App.css';
import {
  // BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
} from 'react-router-dom';

import Header from './Header';
import AppState from './contexts/AppState';
// eslint-disable-next-line
import Test from './Test';
import Left from './Left';
import Center from './Center';
import Footer from './Footer';
import Home from './Home';
import Search from './search/Search';
import AboutUs from './AboutUs';
import SearchState from './search/SearchState';
import Playerstate from './player/PlayerState';
import RowItemPage from './RowItemPage';
import PhoneMenu from './PhoneMenu';
import MoreSong from './MoreSong';
import RowItemPageState from './rowItemPageState/RowItemPageState';
import Person from './Person';
import { useEffect } from 'react';
import { detect } from 'detect-browser';
import Spinner from './spinner/Spinner';
import PhoneList from './PhoneList';
import Y from './Y';
import Foooter from './Foooter';
const App = () => {
  // console.log(window.screen.width);
  const browser = detect();
  const location = useLocation();
  // if (browser) {
  //   console.log(browser.name);
  //   console.log(browser.version);
  //   console.log(browser.os);
  // }
  const truncate = (str, no_words) => {
    return str.split(' ').splice(0, no_words).join(' ');
  };

  console.log(truncate('The quick brown fox jumps over the lazy dog', 1));
  function detectMob() {
    const toMatch = [
      /Android/i,
      /webOS/i,
      /iPhone/i,
      /iPad/i,
      /iPod/i,
      /BlackBerry/i,
      /Windows Phone/i,
    ];

    return toMatch.some((toMatchItem) => {
      return navigator.userAgent.match(toMatchItem);
    });
  }
  useEffect(() => {
    // console.log(location.pathname);
  }, [location.pathname]);
  // console.log(detectMob());
  return (
    <div className='app '>
      <AppState>
        <Playerstate>
          <SearchState>
            <RowItemPageState>
              {/* <PhoneList />
              <Y /> */}
              <Center />
              <Left />
              <Header />
              <Switch>
                <Route exact path='/' component={Home} />
                <Route
                  sensitive
                  exact
                  path={`/song/:slug`}
                  component={RowItemPage}
                />
                <Route exact path='/search' component={Search} />
                <Route
                  sensitive
                  exact
                  path='/list/:slug'
                  component={MoreSong}
                />
                {/* <Route
                  exact
                  path='/list/:slug'
                  component={() => <MoreSong slug={} />}
                /> */}
                <Route exact path='/aboutus' component={AboutUs} />
                <Route
                  sensitive
                  exact
                  path='/person/:slug'
                  component={Person}
                />
                <Route exact path='/:slug' component={Home} />
                <Route exact path='/**' component={AboutUs} />
              </Switch>

              {/* <Footer /> */}
              <Foooter />
              <PhoneMenu />
            </RowItemPageState>
          </SearchState>
        </Playerstate>
      </AppState>
    </div>
  );
};

// const rootElement = document.getElementById('root');
// ReactDOM.render(<App />, rootElement);

export default App;
