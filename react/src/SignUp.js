import React from "react";
import "./assets/bootstrap/css/bootstrap.min.css";
import "./assets/fonts/fontawesome5-overrides.min.css";
import LandingImage from "./assets/img/dogs/image2.jpeg";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      ssn: "",
      password: "",
      passwordConfirm: "",
      errorMessage: "",
    };
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

  async signUp(e) {
    e.preventDefault();
    let email = this.state.email.toLowerCase();
    let response = await fetch("http://localhost/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        firstname: this.state.firstName,
        lastname: this.state.lastName,
        password: this.state.password,
        email: email,
        address: this.state.address,
        ssn: this.state.ssn,
        password: this.state.password,
        passwordconfirm: this.state.passwordConfirm,
      }),
    }).catch((err) => console.log(err));
    let json = await response.json();
    if (json.data != "Success") {
      this.setState({ errorMessage: json.data });
    } else {
      sessionStorage.setItem("firstName", json.firstname);
      sessionStorage.setItem("lastName", json.lastname);
      sessionStorage.setItem("email", email);
      window.location.href = "addAccount";
    }
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="card shadow-lg o-hidden border-0 my-5">
            <div className="card-body p-0">
              <div className="row">
                <div className="col-lg-5 d-none d-lg-flex">
                  <div
                    className="flex-grow-1 bg-register-image"
                    style={{ backgroundImage: `url(${LandingImage})` }}
                  ></div>
                </div>
                <div className="col-lg-7">
                  <div className="p-5">
                    <div className="text-center">
                      <h4 className="text-dark mb-4">Create an Account!</h4>
                    </div>
                    <form className="user">
                      <div className="text-center">
                        <h4 className="text-dark mb-4">
                          {this.state.errorMessage}
                        </h4>
                      </div>
                      <div className="row mb-3">
                        <div className="col-sm-6 mb-3 mb-sm-0">
                          <input
                            className="form-control form-control-user"
                            type="text"
                            placeholder="First Name"
                            name="first_name"
                            onChange={(event) => {
                              this.setState({ firstName: event.target.value });
                            }}
                          ></input>
                        </div>
                        <div className="col-sm-6">
                          <input
                            className="form-control form-control-user"
                            type="text"
                            placeholder="Last Name"
                            name="last_name"
                            onChange={(event) => {
                              this.setState({ lastName: event.target.value });
                            }}
                          ></input>
                        </div>
                      </div>
                      <div className="mb-3">
                        <input
                          className="form-control form-control-user"
                          type="email"
                          aria-describedby="emailHelp"
                          placeholder="Email Address"
                          name="email"
                          onChange={(event) => {
                            this.setState({ email: event.target.value });
                          }}
                        ></input>
                      </div>
                      <div className="mb-3">
                        <input
                          className="form-control form-control-user"
                          type="text"
                          aria-describedby="emailHelp"
                          placeholder="Home Address"
                          name="address"
                          onChange={(event) => {
                            this.setState({ address: event.target.value });
                          }}
                        ></input>
                      </div>
                      <div className="mb-3">
                        <input
                          className="form-control form-control-user"
                          type="password"
                          aria-describedby="emailHelp"
                          placeholder="Social Security Number"
                          name="ssn"
                          required=""
                          pattern="^[0-9]+$"
                          minlength="9"
                          maxlength="9"
                          onChange={(event) => {
                            this.setState({ ssn: event.target.value });
                          }}
                        ></input>
                      </div>
                      <div className="row mb-3">
                        <div className="col-sm-6 mb-3 mb-sm-0">
                          <input
                            className="form-control form-control-user"
                            type="password"
                            placeholder="Password"
                            name="password"
                            onChange={(event) => {
                              this.setState({ password: event.target.value });
                            }}
                          ></input>
                        </div>
                        <div className="col-sm-6">
                          <input
                            className="form-control form-control-user"
                            type="password"
                            placeholder="Repeat Password"
                            name="password_repeat"
                            onChange={(event) => {
                              this.setState({
                                passwordConfirm: event.target.value,
                              });
                            }}
                          ></input>
                        </div>
                      </div>
                      <button
                        className="btn btn-primary d-block btn-user w-100"
                        onClick={this.signUp.bind(this)}
                      >
                        Register Account
                      </button>
                      <hr></hr>
                    </form>
                    <div className="text-center">
                      <a className="small" href="login">
                        Already have an account? Login!
                      </a>
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

export default SignUp;
