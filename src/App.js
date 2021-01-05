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
import axios from './axios/axios';
import RowItemPage from './RowItemPage';
import Slug from './Slug';
import PhoneMenu from './PhoneMenu';
import MoreSong from './MoreSong';

// function Carousel() {
//   return (
//     <div className='app'>
//       <Flickity>
//         <img src='https://placeimg.com/640/480/animals' />
//         <img src='https://placeimg.com/640/480/nature' />
//         <img src='https://placeimg.com/640/480/architecture' />
//         <img src='https://placeimg.com/640/480/architecture' />
//         <img src='https://placeimg.com/640/480/architecture' />
//         <img src='https://placeimg.com/640/480/architecture' />
//         <img src='https://placeimg.com/640/480/architecture' />
//       </Flickity>
//     </div>
//   );
// }

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
              <PhoneMenu />
              <Footer />
            </Router>
          </SearchState>
        </Playerstate>
      </AppState>
    </div>
  );
};

// const rootElement = document.getElementById('root');
// ReactDOM.render(<App />, rootElement);

export default App;
