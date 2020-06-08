import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import auth from "../services/authService";

class Profile extends Form {
  state = {
    data: {},
    errors: {},
  };

  render() {
    const user = auth.currentUser;
    return (
      <React.Fragment>
        <h1>User Profile</h1>
        <small className="text-muted">
          {user.isAdmin ? (
            <span className="badge badge-pill badge-dark">( Admin )</span>
          ) : (
            ""
          )}
        </small>
        <dl className="row">
          <dt className="col-sm-3">Full Name </dt>
          <dd className="col-sm-9">{user.name}</dd>
          <dt className="col-sm-3">Email </dt>
          <dd className="col-sm-9">{user.email}</dd>
        </dl>
      </React.Fragment>
    );
  }
}

export default Profile;
