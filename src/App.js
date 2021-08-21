import React, { useEffect, useState } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import "swiper/swiper-bundle.css";
import "swiper/swiper-bundle.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Header";
import AppState from "./contexts/AppState";
import Left from "./Left";
import Center from "./Center";
import Home from "./Home";
import Search from "./search/Search";
import SearchState from "./search/SearchState";
import Playerstate from "./player/PlayerState";
import PhoneMenu from "./PhoneMenu";
import MoreSong from "./pages/MoreSong/MoreSong";
import Person from "./pages/person/Person";
import Register from "./pages/register/Register";
import AuthState from "./auth/AuthState";
import ScrollToTop from "./ScrollToTop";
import PhoneList from "./PhoneList";
import AllPerson from "./pages/AllPerson/AllPerson";
import MyProfile from "./pages/myprofile/MyProfile";
import UserInterests from "./pages/userInterests/UserInterests";
import NotFound from "./pages/notFound/NotFound";
import ForceLogin from "./ForceLogin";
import PasswordReset from "./pages/passwordReset/PasswordReset";
import Login from "./pages/login/Login";
import RowItemPage from "./pages/rowItemPage/RowItemPage";

const App = () => {
  return (
    <div className="app ">
      <AppState>
        <AuthState>
          <Playerstate>
            <SearchState>
              <ScrollToTop />
              <ForceLogin />
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
                <Route exact path="/user-interests" component={UserInterests} />
                <Route
                  sensitive
                  exact
                  path="/person/:slug"
                  component={Person}
                />
                <Route sensitive exact path="/persons" component={AllPerson} />
                <Route exact path="/password_reset" component={PasswordReset} />
                <Route exact path="/not_found" component={NotFound} />
                <Route exact path="/:slug" component={Home} />
                <Route exact path="/**" component={NotFound} />
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
