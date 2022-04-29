import React from "react";
import "./assets/bootstrap/css/bootstrap.min.css";
import "./assets/fonts/fontawesome5-overrides.min.css";
import LandingImage from "./assets/img/dogs/image3.jpeg"

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errorMessage: ""
    }
  }

  componentDidMount() {
    const link1 = document.createElement("link");
    const link2 = document.createElement("link");
    const link3 = document.createElement("link");
    link1.rel = "stylesheet";
    link1.href =
      "https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i";
    link2.rel = "stylesheet";
    link2.href = "https://use.fontawesome.com/releases/v5.12.0/css/all.css";
    link3.rel = "stylesheet";
    link3.href =
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css";

    document.body.appendChild(link1);
    document.body.appendChild(link2);
    document.body.appendChild(link3);
    document.body.className = "bg-gradient-primary";
  }

  async signIn(e) {
    e.preventDefault();
    let email = this.state.email.toLowerCase();
    let response = await fetch(
      "http://localhost/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: this.state.password,
        }),
      }
    ).catch((err) => console.log(err));
    let json = await response.json();
    if (json.data != "Success") {
      this.setState({ errorMessage: json.data });
    } else {
      sessionStorage.setItem("email", email);
      sessionStorage.setItem("firstName", json.firstname);
      sessionStorage.setItem("lastName", json.lastname);
      sessionStorage.setItem("ssn", json.ssn);
      window.location = "addAccount";
    }
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-9 col-lg-12 col-xl-10">
              <div className="card shadow-lg o-hidden border-0 my-5">
                <div className="card-body p-0">
                  <div className="row">
                    <div className="col-lg-6 d-none d-lg-flex">
                      <div
                        className="flex-grow-1 bg-login-image"
                        style={{ backgroundImage:`url(${LandingImage})` }}
                      ></div>
                    </div>
                    <div className="col-lg-6">
                      <div className="p-5">
                        <div className="text-center">
                          <h4 className="text-dark mb-4">Welcome Back!</h4>
                        </div>
                        <form className="user">
                        <div className="text-center">
                          <h4 className="text-dark mb-4">
                          {this.state.errorMessage}
                          </h4>
                        </div>
                          <div className="mb-3">
                            <input
                              className="form-control form-control-user"
                              type="email"
                              id="exampleInputEmail"
                              aria-describedby="emailHelp"
                              placeholder="Enter Email Address..."
                              name="email"
                              onChange={(event) => {
                                this.setState({ email: event.target.value });
                              }}
                            ></input>
                          </div>
                          <div className="mb-3">
                            <input
                              className="form-control form-control-user"
                              type="password"
                              id="exampleInputPassword"
                              placeholder="Password"
                              name="password"
                              onChange={(event) => {
                                this.setState({ password: event.target.value });
                              }}
                            ></input>
                          </div>
                          <div className="mb-3">
                            <div className="custom-control custom-checkbox small"></div>
                          </div>
                          <button
                            className="btn btn-primary d-block btn-user w-100"
                            onClick={this.signIn.bind(this)}
                          >
                            Login
                          </button>
                          <hr></hr>
                        </form>
                        <div className="text-center">
                          <a className="small" href="signup">
                            Create an Account!
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
