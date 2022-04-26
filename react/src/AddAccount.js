import React from "react";
import "./assets/bootstrap/css/bootstrap.min.css";
import "./assets/fonts/fontawesome5-overrides.min.css";

class AddAccount extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const link1 = document.createElement("link");
    const link2 = document.createElement("link");
    const link3 = document.createElement("link");
    const link4 = document.createElement("script");
    const link5 = document.createElement("script");
    link1.rel = "stylesheet";
    link1.href =
      "https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i";
    link2.rel = "stylesheet";
    link2.href = "https://use.fontawesome.com/releases/v5.12.0/css/all.css";
    link3.rel = "stylesheet";
    link3.href =
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css";
    link4.src =
      "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js";
    document.body.appendChild(link1);
    document.body.appendChild(link2);
    document.body.appendChild(link3);
    document.body.appendChild(link4);
  }

  render() {
    return (
      <div>
        <div id="wrapper">
          <nav className="navbar navbar-dark align-items-start sidebar sidebar-dark accordion bg-gradient-primary p-0">
            <div className="container-fluid d-flex flex-column p-0">
              <a
                className="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0"
                href="#"
              >
                <div className="sidebar-brand-icon rotate-n-15">
                  <i
                    className="far fa-building"
                    style={{
                      transform: "rotate(15deg)",
                      transformOrigin: "center",
                    }}
                  ></i>
                </div>
                <div className="sidebar-brand-text mx-3">
                  <span>Bank</span>
                </div>
              </a>
              <hr className="sidebar-divider my-0"></hr>
              <ul className="navbar-nav text-light" id="accordionSidebar">
                <li className="nav-item"></li>
                <li className="nav-item"></li>
                <li className="nav-item">
                  <a className="nav-link" href="viewAccount">
                    <i className="fas fa-table"></i>
                    <span>Account Information</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active">
                    <i className="far fa-user-circle"></i>
                    <span>Add Account</span>
                  </a>
                </li>
                <li className="nav-item"></li>
              </ul>
            </div>
          </nav>
          <div className="d-flex flex-column" id="content-wrapper">
            <div id="content">
              <div className="container-fluid" style={{ marginTop: "1.5rem" }}>
                <h3 className="text-dark mb-4">Add Account</h3>
                <div className="row mb-3">
                  <div className="col-lg-8">
                    <div className="row mb-3 d-none">
                      <div className="col">
                        <div className="card textwhite bg-primary text-white shadow">
                          <div className="card-body">
                            <div className="row mb-2">
                              <div className="col">
                                <p className="m-0">Peformance</p>
                                <p className="m-0">
                                  <strong>65.2%</strong>
                                </p>
                              </div>
                              <div className="col-auto">
                                <i className="fas fa-rocket fa-2x"></i>
                              </div>
                            </div>
                            <p className="text-white-50 small m-0">
                              <i className="fas fa-arrow-up"></i>&nbsp;5% since
                              last month
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col">
                        <div className="card textwhite bg-success text-white shadow">
                          <div className="card-body">
                            <div className="row mb-2">
                              <div className="col">
                                <p className="m-0">Peformance</p>
                                <p className="m-0">
                                  <strong>65.2%</strong>
                                </p>
                              </div>
                              <div className="col-auto">
                                <i className="fas fa-rocket fa-2x"></i>
                              </div>
                            </div>
                            <p className="text-white-50 small m-0">
                              <i className="fas fa-arrow-up"></i>&nbsp;5% since
                              last month
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <div className="card shadow mb-3">
                          <div className="card-header py-3">
                            <p className="text-primary m-0 fw-bold">
                              User Information
                            </p>
                          </div>
                          <div className="card-body">
                            <form>
                              <div className="row">
                                <div className="col">
                                  <div className="mb-3">
                                    <label className="form-label">
                                      <strong>First Name</strong>
                                    </label>
                                    <input
                                      className="form-control"
                                      type="text"
                                      id="first_name"
                                      placeholder="John"
                                      name="first_name"
                                      readOnly={true}
                                    ></input>
                                  </div>
                                </div>
                                <div className="col">
                                  <div className="mb-3">
                                    <label className="form-label">
                                      <strong>Last Name</strong>
                                    </label>
                                    <input
                                      className="form-control"
                                      type="text"
                                      id="last_name"
                                      placeholder="Doe"
                                      name="last_name"
                                      readOnly={true}
                                    ></input>
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col">
                                  <div className="mb-3">
                                    <label className="form-label">
                                      <strong>Email Address</strong>
                                    </label>
                                    <input
                                      className="form-control"
                                      type="email"
                                      id="email"
                                      placeholder="user@example.com"
                                      name="email"
                                      readOnly={true}
                                    ></input>
                                  </div>
                                </div>
                              </div>
                              <div className="mb-3"></div>
                            </form>
                          </div>
                        </div>
                        <div className="card shadow">
                          <div className="card-header py-3">
                            <p className="text-primary m-0 fw-bold">
                              Account Information
                            </p>
                          </div>
                          <div className="card-body">
                            <form>
                              <div className="row">
                                <div className="col">
                                  <div className="mb-3">
                                    <label className="form-label">
                                      <strong>Branch Name</strong>
                                    </label>
                                    <div className="dropdown">
                                      <button
                                        className="btn btn-primary dropdown-toggle"
                                        aria-expanded="false"
                                        data-bs-toggle="dropdown"
                                        type="button"
                                      >
                                        Dropdown{" "}
                                      </button>
                                      <div className="dropdown-menu">
                                        <a className="dropdown-item" href="#">
                                          Newark 1
                                        </a>
                                        <a className="dropdown-item" href="#">
                                          Woodbridge 2
                                        </a>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col">
                                  <div className="mb-3">
                                    <label className="form-label">
                                      <strong>Bank Name</strong>
                                    </label>
                                    <input
                                      className="form-control"
                                      type="text"
                                      id="country"
                                      placeholder="Name of Bank"
                                      name="country"
                                      readOnly={true}
                                    ></input>
                                  </div>
                                </div>
                              </div>
                              <div className="mb-3">
                                <button
                                  className="btn btn-primary btn-sm"
                                  type="submit"
                                >
                                  Create Account
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <footer className="bg-white sticky-footer">
              <div className="container my-auto">
                <div className="text-center my-auto copyright">
                  <span>
                    Copyright © Vignesh Nethrapalli and Harsh Panwar 2022
                  </span>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    );
  }
}

export default AddAccount;
