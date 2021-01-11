import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
  Prompt,
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
// eslint-disable-next-line
import axios from './axios/axios';
import RowItemPage from './RowItemPage';
import PhoneMenu from './PhoneMenu';
import MoreSong from './MoreSong';
import RowItemPageState from './rowItemPageState/RowItemPageState';
import MusicBar from './MusicBar';
import Person from './Person';
import { useEffect } from 'react';
import { detect } from 'detect-browser';
const App = () => {
  // console.log(window.screen.width);
  const browser = detect();
  const location = useLocation();
  // if (browser) {
  //   console.log(browser.name);
  //   console.log(browser.version);
  //   console.log(browser.os);
  // }

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
    <div
      className='app '

      // style={{ marginBottom: '1000px' }}
    >
      <AppState>
        <Playerstate>
          <SearchState>
            <RowItemPageState>
              <Center />
              <Left />
              <Header />
              <Switch>
                {/* <Route
                  exact
                  path='/'
                  component={() => <Home slug={'home'} />}
                /> */}
                <Route exact path='/' component={Home} />
                <Route exact path={`/song/:slug`} component={RowItemPage} />
                <Route exact path='/search' component={Search} />
                <Route exact path='/list/:slug' component={MoreSong} />
                <Route exact path='/aboutus' component={AboutUs} />
                <Route exact path='/person/:slug' component={Person} />
              </Switch>

              <Footer />
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
