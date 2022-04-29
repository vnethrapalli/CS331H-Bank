import React from "react";
import "./assets/bootstrap/css/bootstrap.min.css";
import "./assets/fonts/fontawesome5-overrides.min.css";

class ViewAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      savingsList: [],
      checkingList: [],
      marketList: [],
      loanList: []
    }
  }

  componentDidMount() {
    if(sessionStorage.getItem("ssn") == null){
      window.location.href = "./";
    }
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
    this.fetchData();
  }

  async fetchData(){
    let response = await fetch(
      "http://localhost/listAccounts",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ssn: sessionStorage.getItem('ssn')
        }),
      }
    ).catch((err) => console.log(err));
    let json = await response.json();
    this.setState({ savingsList: json.savings });
    this.setState({ checkingList: json.checking });
    this.setState({ marketList: json.market });
    this.setState({ loanList: json.loans });
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
                    <p className="text-primary m-0 fw-bold">Savings Accounts</p>
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
                            <th>Balance</th>
                            <th>Interest Rate</th>
                            <th>Last accessed date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.savingsList.map((item) => {
                            return (<tr>
                              <td>{item[0]}</td>
                              <td>{item[1]}</td>
                              <td>{item[2]}</td>
                              <td>{item[3].split("T")[0]}</td>
                            </tr>);
                          })}
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
                                Balance<br></br>
                              </strong>
                            </td>
                            <td>
                              <strong>
                                Interest Rate<br></br>
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
                          Showing {this.state.savingsList.length} Account(s)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card shadow" style={{ marginTop: "1.5rem" }}>
                  <div className="card-header py-3">
                    <p className="text-primary m-0 fw-bold">Checking Accounts</p>
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
                            <th>Balance</th>
                            <th>Overdraft Fee</th>
                            <th>Last accessed date</th>
                          </tr>
                        </thead>
                        <tbody>
                        {this.state.checkingList.map((item) => {
                            return (<tr>
                              <td>{item[0]}</td>
                              <td>{item[1]}</td>
                              <td>{item[2]}</td>
                              <td>{item[3].split("T")[0]}</td>
                            </tr>);
                          })}
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
                                Balance<br></br>
                              </strong>
                            </td>
                            <td>
                              <strong>
                                Overdraft Fee<br></br>
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
                          Showing {this.state.checkingList.length} Account(s)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card shadow" style={{ marginTop: "1.5rem" }}>
                  <div className="card-header py-3">
                    <p className="text-primary m-0 fw-bold">Money Market Accounts</p>
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
                            <th>Balance</th>
                            <th>Variable Interest Rate</th>
                            <th>Last accessed date</th>
                          </tr>
                        </thead>
                        <tbody>
                        {this.state.marketList.map((item) => {
                            return (<tr>
                              <td>{item[0]}</td>
                              <td>{item[1]}</td>
                              <td>{item[2]}</td>
                              <td>{item[3].split("T")[0]}</td>
                            </tr>);
                          })}
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
                                Balance<br></br>
                              </strong>
                            </td>
                            <td>
                              <strong>
                                Variable Interest Rate<br></br>
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
                          Showing {this.state.marketList.length} Account(s)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card shadow" style={{ marginTop: "1.5rem" }}>
                  <div className="card-header py-3">
                    <p className="text-primary m-0 fw-bold">Loans Accounts</p>
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
                            <th>Amount</th>
                            <th>Balance</th>
                            <th>Interest Rate</th>
                            <th>Monthly Repayment</th>
                            <th>Last accessed date</th>
                          </tr>
                        </thead>
                        <tbody>
                        {this.state.loanList.map((item) => {
                            return (<tr>
                              <td>{item[0]}</td>
                              <td>{item[1]}</td>
                              <td>{item[2]}</td>
                              <td>{item[3]}</td>
                              <td>{item[4]}</td>
                              <td>{item[5].split("T")[0]}</td>
                            </tr>);
                          })}
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
                                Amount<br></br>
                              </strong>
                            </td>
                            <td>
                              <strong>
                                Balance<br></br>
                              </strong>
                            </td>
                            <td>
                              <strong>
                                Interest Rate<br></br>
                              </strong>
                            </td>
                            <td>
                              <strong>
                                Monthly Repayment<br></br>
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
                          Showing {this.state.loanList.length} Account(s)
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
