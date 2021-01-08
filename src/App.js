import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

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

const App = () => {
  // console.log(slug);
  // const doa = async () => {
  //   try {
  //     const res = await axios.get('page/home');
  //     console.log(res);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // doa();
  return (
    <div
      className='app '

      // style={{ marginBottom: '1000px' }}
    >
      <AppState>
        <Playerstate>
          <SearchState>
            <RowItemPageState>
              <Router>
                <Center />
                <Left />
                <Header />
                <Switch>
                  <Route exact path='/' component={Home} />
                  <Route
                    exact
                    path={`/rowitempage/:slug`}
                    component={RowItemPage}
                  />
                  <Route exact path='/search' component={Search} />
                  <Route exact path='/list/:slug' component={MoreSong} />
                  <Route exact path='/aboutus' component={AboutUs} />
                </Switch>

                <Footer />
                <PhoneMenu />
              </Router>
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
