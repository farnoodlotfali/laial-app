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
import Person from './Person';
import Foooter from './Foooter';
import Test from './Test';
import Register from './Register';
import Login from './Login';
import AuthState from './auth/AuthState';
import ScrollToTop from './ScrollToTop';
import PhoneList from './PhoneList';

const App = () => {
  return (
    <div className='app '>
      <AppState>
        <AuthState>
          <Playerstate>
            <SearchState>
              <ScrollToTop />
              <PhoneList />
              <Center />
              <Left />
              <Header />
              <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/register' component={Register} />
                <Route exact path='/login' component={Login} />
                <Route
                  sensitive
                  exact
                  path={`/song/:slug`}
                  component={RowItemPage}
                  exact
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
            </SearchState>
          </Playerstate>
        </AuthState>
      </AppState>
    </div>
  );
};

export default App;
