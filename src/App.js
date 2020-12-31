import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './Header';
import AppState from './contexts/AppState';
import Banner from './Banner';
// eslint-disable-next-line
import Test from './Test';
import RowList from './RowList';
import MusicBar from './MusicBar';
import Left from './Left';
import Center from './Center';
import Footer from './Footer';
import Home from './Home';
import Search from './search/Search';
import AboutUs from './AboutUs';
import Navigation from './Navigation';
import SearchState from './search/SearchState';
import FullControl from './FullControl';
import Playerstate from './player/PlayerState';
//interval={null}
import ReactDOM from 'react-dom';
import Flickity from 'react-flickity-component';

function Carousel() {
  return (
    <div className='app'>
      <Flickity>
        <img src='https://placeimg.com/640/480/animals' />
        <img src='https://placeimg.com/640/480/nature' />
        <img src='https://placeimg.com/640/480/architecture' />
        <img src='https://placeimg.com/640/480/architecture' />
        <img src='https://placeimg.com/640/480/architecture' />
        <img src='https://placeimg.com/640/480/architecture' />
        <img src='https://placeimg.com/640/480/architecture' />
      </Flickity>
    </div>
  );
}

function App() {
  return (
    <AppState>
      <Playerstate>
        <SearchState>
          <Router>
            <div className='app ' style={{ marginBottom: '1000px' }}>
              <MusicBar />
              <Center />
              <Left />
              <Header />
              <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/search' component={Search} />
                <Route exact path='/aboutus' component={AboutUs} />
              </Switch>
              <Footer />
            </div>
          </Router>
        </SearchState>
      </Playerstate>
    </AppState>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);

export default App;
