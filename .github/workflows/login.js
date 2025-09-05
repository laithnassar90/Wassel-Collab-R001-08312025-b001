// utils
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Col, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ActionCable from "actioncable";
import _ from "lodash";

// actions
import { logInEmailBackend, logInFbBackend } from "../../../actions/session";
import { ActionCableURL } from "../../../constants/constants";
import { fetchCurrentUser } from "../../../actions/users";
import { fetchNotifications } from "../../../actions/notifications";

// components
import { LoginFb } from "../../../components/session/login-fb/login-fb";
import LoginEmail from "../../../components/session/login-email/login-email";

class Login extends Component {
  static propTypes = {
    errors: PropTypes.array,
    isFetching: PropTypes.bool.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    logInEmailBackend: PropTypes.func.isRequired,
    logInFbBackend: PropTypes.func.isRequired,
    fetchCurrentUser: PropTypes.func.isRequired,
    fetchNotifications: PropTypes.func.isRequired,
    navigate: PropTypes.func, // passed from wrapper
  };

  handleEmailLogin(data) {
    const { logInEmailBackend, fetchCurrentUser, fetchNotifications, navigate } = this.props;

    logInEmailBackend(data)
      .then((response) => {
        let userData = response.payload.data;
        fetchCurrentUser();
        fetchNotifications();
        window.cable = ActionCable.createConsumer(
          `${ActionCableURL}?email=${userData.email}&token=${userData.access_token}`
        );
        navigate("/");
      })
      .catch(() => {});
  }

  handleFbLogin(data) {
    const { logInFbBackend, fetchCurrentUser, fetchNotifications, navigate } = this.props;

    logInFbBackend(data)
      .then((response) => {
        let userData = response.payload.data;
        fetchCurrentUser();
        fetchNotifications();
        window.cable = ActionCable.createConsumer(
          `${ActionCableURL}?email=${userData.email}&token=${userData.access_token}`
        );
        navigate("/");
      })
      .catch(() => {});
  }

  renderFormErrors() {
    const { errors } = this.props;

    if (!_.isEmpty(errors)) {
      return (
        <Alert variant="danger">
          <strong>{errors}</strong>
        </Alert>
      );
    }
  }

  render() {
    const { errors } = this.props;

    return (
      <div className="show-grid">
        <div className="background clearfix"></div>

        <div className="login-errors">
          <Col xs={12} md={8} mdOffset={2}>
            {this.renderFormErrors()}
          </Col>
        </div>

        <div className="login clearfix">
          <Col xs={12} md={8} mdOffset={2} className="display-table">
            <div className="login-form">
              <h3 className="login-form__title">Login</h3>
              <LoginFb onDataReceive={this.handleFbLogin.bind(this)} />
              <div className="login-button__separator">or</div>
              <LoginEmail errors={errors} onSubmit={this.handleEmailLogin.bind(this)} />
            </div>
            <div className="register-form">
              <h3 className="login-form__title">Register</h3>
              <button className="btn btn-primary register-button">
                <Link key="register" to="/register">
                  Register
                </Link>
              </button>
            </div>
          </Col>
        </div>
      </div>
    );
  }
}

// Redux
const mapStateToProps = (state) => ({
  errors: state.session.errors,
  isFetching: state.session.isFetching,
  isAuthenticated: state.session.isAuthenticated,
});

const mapDispatchToProps = {
  logInEmailBackend,
  logInFbBackend,
  fetchCurrentUser,
  fetchNotifications,
};

// Wrapper to inject navigate
function withNavigation(Component) {
  return function WrappedComponent(props) {
    const navigate = useNavigate();
    return <Component {...props} navigate={navigate} />;
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(Login));
