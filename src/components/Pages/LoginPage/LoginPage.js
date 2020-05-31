import React, { Component } from "react";
import axios from "axios";
import { eraseCookie, getCookie, setCookie } from "../../../utils/cookie";
import "./loginStyle.css";
import logo from "../../../resim.png";

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      confirmPassword: "",
      email: "",
      isSignUp: false,
      loading: false
    };
  }

  login = async (e) => {
    e.preventDefault();
    this.setState({loading: true});
    let { username, password, confirmPassword, isSignUp, email } = this.state;
    let url = "";
    let data = {};
    if (isSignUp) {
      url = "/api/register";
      data = { login: username, password: password, email: email, langKey: "en" };
    } else {
      url = "/api/authenticate";
      data = { username: username, password: password };
    }

    const axiosInstance = axios.create({
      baseURL: "https://mis-422.herokuapp.com",
      headers: { "Content-Type": "application/json" },
      timeout: 60000,
    });
    if ((isSignUp && password === confirmPassword) || !isSignUp) {
      let error;
      let response = await axiosInstance.post(
        url,
        data
      ).catch(err => error = err.response.data);
      if (response?.status === 200 || response?.status === 201) {
        if (isSignUp) {
          alert("Please check your email for confirmation");
        } else {
          setCookie("token", response.data.id_token, {});
        }
        this.setState({loading: false});
        this.props.onClick();
      } else {
        if (isSignUp) {
          alert(error.title);
        } else {
          if (error.detail.toString().toLowerCase().includes('user')) {
            alert(error.detail);
          } else {
            alert('Password or username is wrong');
          }
        }
        this.setState({loading: false});
      }
    } else {
      alert("passwords does not match");
      this.setState({loading: false});
    }

  };

  render() {
    let {isSignUp, loading} = this.state;
    return (
      <div className="loginContainer" onClick={() => !loading ? this.props.onClick(true) : {}}>
        <div className="user_card" onClick={e => {e.stopPropagation();}}>
          <div className="d-flex justify-content-center">
            <div className="brand_logo_container">
              <img src={logo} />
            </div>
          </div>
          <div className="d-flex justify-content-center form_container">
            <form onSubmit={(e) => this.login(e)}>
              <div className="input-group mb-3">
                <div className="input-group-append">
                  <span className="input-group-text">
                    <i style={{color:"white"}} className="fas fa-user" />
                  </span>
                </div>
                <input
                  type="text"
                  name="username"
                  className="form-control input_user"
                  onChange={(e) =>
                    this.setState({ username: e.target.value })
                  }
                  value={this.state.username}
                  placeholder="username"
                />
              </div>
              {isSignUp && <div className="input-group mb-3">
                <div className="input-group-append">
                  <span className="input-group-text">
                    <i className="fas fa-at"></i>
                  </span>
                </div>
                <input
                    type="email"
                    name="email"
                    className="form-control input_user"
                    onChange={(e) =>
                        this.setState({ email: e.target.value })
                    }
                    value={this.state.email}
                    placeholder="email"
                />
              </div>}
              <div className="input-group mb-3">
                <div className="input-group-append">
                  <span className="input-group-text">
                    <i className="fas fa-key"></i>
                  </span>
                </div>
                <input
                  type="password"
                  name=""
                  className="form-control input_pass"
                  onChange={(e) =>
                    this.setState({ password: e.target.value })
                  }
                  value={this.state.password}
                  placeholder="password"
                />
              </div>
              {isSignUp && <div className="input-group mb-3">
                <div className="input-group-append">
                  <span className="input-group-text">
                    <i className="fas fa-check-square"></i>
                  </span>
                </div>
                <input
                    type="password"
                    name=""
                    className="form-control input_pass"
                    onChange={(e) =>
                        this.setState({ confirmPassword: e.target.value })
                    }
                    value={this.state.confirmPassword}
                    placeholder="confirm password"
                />
              </div>}
              {!isSignUp && <div className="form-group">
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="customControlInline"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="customControlInline"
                  >
                    Remember me
                  </label>
                </div>
              </div>}
              <div className="d-flex justify-content-center mt-3 login_container">
                {!loading ? <input
                  type="submit"
                  name="button"
                  className="btn login_btn"
                  value={isSignUp ? "Sign Up" : "Sign In"}
                />
                : <button className="btn login_btn"><i className={"fa fa-spinner"}/></button>}
              </div>
            </form>
          </div>

          <div className="mt-4">
            <div className="d-flex justify-content-center links">
              {isSignUp ? "Already have an account? " : "Don't have an account? "}
              <a className="ml-2 href" onClick={() => this.setState({isSignUp: !isSignUp})}>
                {!isSignUp ? "Sign Up" : "Sign In"}
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginPage;
