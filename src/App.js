import React from 'react';
import './App.css';
import {
  // BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import Header from './Header';
import AppState from './contexts/AppState';
// eslint-disable-next-line
import Left from './Left';
import Center from './Center';
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
import axios from 'axios';
import Foooter from './Foooter';
import Test from './Test';
const App = () => {
  // const browser = detect();
  // const location = useLocation();
  // if (browser) {
  //   console.log(browser.name);
  //   console.log(browser.version);
  //   console.log(browser.os);
  // }

  return (
    <div className='app '>
      {/* <Test /> */}
      <AppState>
        <Playerstate>
          <SearchState>
            <RowItemPageState>
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
