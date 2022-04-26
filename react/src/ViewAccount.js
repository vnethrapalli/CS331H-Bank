import React from "react";
import "./assets/bootstrap/css/bootstrap.min.css";
import "./assets/fonts/fontawesome5-overrides.min.css";

class ViewAccount extends React.Component {
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
                  <a className="nav-link active">
                    <i className="fas fa-table"></i>
                    <span>Account Information</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="addAccount">
                    <i className="far fa-user-circle"></i>
                    <span>Add Account</span>
                  </a>
                </li>
                <li className="nav-item"></li>
              </ul>{" "}
            </div>
          </nav>
          <div className="d-flex flex-column" id="content-wrapper">
            <div id="content">
              <div className="container-fluid" style={{ marginTop: "1.5rem" }}>
                <h3 className="text-dark mb-4">Account Information</h3>
                <div className="card shadow">
                  <div className="card-header py-3">
                    <p className="text-primary m-0 fw-bold">Accounts List</p>
                  </div>
                  <div className="card-body">
                    <div
                      className="table-responsive table mt-2"
                      id="dataTable"
                      role="grid"
                      aria-describedby="dataTable_info"
                    >
                      <table className="table my-0" id="dataTable">
                        <thead>
                          <tr>
                            <th>Account Number</th>
                            <th>Interest Rate</th>
                            <th>Balance</th>
                            <th>Last accessed date</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>########</td>
                            <td>1.00%</td>
                            <td>$1,023,456</td>
                            <td>04/25/2022</td>
                          </tr>
                        </tbody>
                        <tfoot>
                          <tr>
                            <td>
                              <strong>
                                Account Number<br></br>
                              </strong>
                            </td>
                            <td>
                              <strong>
                                Interest Rate<br></br>
                              </strong>
                            </td>
                            <td>
                              <strong>
                                Balance<br></br>
                              </strong>
                            </td>
                            <td>
                              <strong>
                                Last accessed date<br></br>
                              </strong>
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                    <div className="row">
                      <div className="col-md-6 align-self-center">
                        <p
                          id="dataTable_info"
                          className="dataTables_info"
                          role="status"
                          aria-live="polite"
                        >
                          Showing 1 Account
                        </p>
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

export default ViewAccount;
