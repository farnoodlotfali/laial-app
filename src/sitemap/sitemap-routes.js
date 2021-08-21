import React from "react";
import { Route } from "react-router";

export default (
  <Route>
    <Route path="/" />
    <Route path="/register" />
    <Route path="/login" />
    <Route path={`/song/:slug`} />
    <Route path="/search" />
    <Route path="/myprofile" />
    <Route path="/list/:slug" />
    <Route path="/user-interests" />
    <Route path="/person/:slug" />
    <Route path="/persons" />
    <Route path="/password_reset" />
    <Route path="/not_found" />
    <Route path="/:slug" />
    <Route path="/**" />
  </Route>
);
