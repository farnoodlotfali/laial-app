import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import "swiper/swiper-bundle.css";
import "swiper/swiper-bundle.min.css";
import Header from "./Header";
import AppState from "./contexts/AppState";
import Left from "./Left";
import Center from "./Center";
import Home from "./Home";
import Search from "./search/Search";
import AboutUs from "./AboutUs";
import SearchState from "./search/SearchState";
import Playerstate from "./player/PlayerState";
import RowItemPage from "./RowItemPage";
import PhoneMenu from "./PhoneMenu";
import MoreSong from "./MoreSong";
import Person from "./Person";
import Register from "./Register";
import Login from "./Login";
import AuthState from "./auth/AuthState";
import ScrollToTop from "./ScrollToTop";
import PhoneList from "./PhoneList";
import AllPerson from "./AllPerson";
import MyProfile from "./MyProfile";
import PasswordReset from "./PasswordReset";
import UserInterests from "./UserInterests";
const App = () => {
  return (
    <div className="app ">
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
                <Route exact path="/" component={Home} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Route
                  sensitive
                  exact
                  path={`/song/:slug`}
                  component={RowItemPage}
                />
                <Route exact path="/search" component={Search} />
                <Route exact path="/myprofile" component={MyProfile} />
                <Route
                  sensitive
                  exact
                  path="/list/:slug"
                  component={MoreSong}
                />
                <Route exact path="/aboutus" component={AboutUs} />
                <Route exact path="/user-interests" component={UserInterests} />
                <Route
                  sensitive
                  exact
                  path="/person/:slug"
                  component={Person}
                />
                <Route
                  sensitive
                  exact
                  path="/allpersons"
                  component={AllPerson}
                />
                <Route exact path="/password_reset" component={PasswordReset} />
                <Route exact path="/:slug" component={Home} />
                <Route exact path="/**" component={AboutUs} />
              </Switch>

              <PhoneMenu />
            </SearchState>
          </Playerstate>
        </AuthState>
      </AppState>
    </div>
  );
};

export default App;
