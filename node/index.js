require("dotenv").config();
const express = require("express");
const path = require("path");
var bodyParser = require("body-parser");
const oracledb = require("oracledb");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const PORT = process.env.PORT || 80;

setupDatabase();

async function setupDatabase() {
  oracledb.initOracleClient({ libDir: "C:\\oracle\\instantclient_21_3" });
  connection = await oracledb.getConnection({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    connectionString: `(DESCRIPTION =(ADDRESS = (PROTOCOL = TCP)(HOST = ${process.env.DB_HOST})(PORT = ${process.env.DB_PORT}))(CONNECT_DATA =(SID= ${process.env.DB_SID})))`,
  });
}

express()
  .use(express.static(path.join(__dirname, "build")))
  .use(express.json())
  .use(bodyParser.urlencoded({ extended: false }))
  .use(cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      return callback(null, true);
    }

  }))
  .set("views", path.join(__dirname, "views"))
  .set("view engine", "ejs")
  .get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
  })
  .post("/listAccounts", async function (req, res) {
    savingsResult = await connection.execute(`select ha.acct_num, hb.balance, s.interest_rate, ha.last_access_date
    from customer c, holds_access ha, holds_balance hb, savings_acct s
    where c.ssn = :SSN
        and c.ssn = ha.cust_ssn
        and ha.acct_num = hb.acct_num
        and hb.acct_num = s.s_acct_num   
    `, { SSN: { val: req.body.ssn } });
    checkingResult = await connection.execute(`select ha.acct_num, hb.balance, ca.overdraft_fee, ha.last_access_date
    from customer c, holds_access ha, holds_balance hb, checking_acct ca
    where c.ssn = :SSN
        and c.ssn = ha.cust_ssn
        and ha.acct_num = hb.acct_num
        and hb.acct_num = ca.c_acct_num    
    `, { SSN: { val: req.body.ssn } });
    marketResult = await connection.execute(`select ha.acct_num, hb.balance, mm.variable_interest_rate, ha.last_access_date
    from customer c, holds_access ha, holds_balance hb, money_market_acct mm
    where c.ssn = :SSN
        and c.ssn = ha.cust_ssn
        and ha.acct_num = hb.acct_num
        and hb.acct_num = mm.mm_acct_num     
    `, { SSN: { val: req.body.ssn } });
    loanResult = await connection.execute(`select ha.acct_num, l.amt, hb.balance, l.interest_rate, l.montly_repayment, ha.last_access_date
    from customer c, holds_access ha, holds_balance hb, loan l
    where c.ssn = :SSN
        and c.ssn = ha.cust_ssn
        and ha.acct_num = hb.acct_num
        and hb.acct_num = l.l_acct_num
    `, { SSN: { val: req.body.ssn } });
    res.send({
      savings: savingsResult.rows,
      checking: checkingResult.rows,
      market: marketResult.rows,
      loans: loanResult.rows
    });
  })
  .post("/login", async function (req, res) {
    result = await connection.execute(`SELECT COUNT(*) FROM LOGIN WHERE EMAIL = :EMAIL`, { EMAIL: { val: req.body.email } });
    if (result.rows[0][0] == 0) {
      res.send({
        data: "Invalid email"
      });
    } else {
      result = await connection.execute(`SELECT PASS FROM LOGIN WHERE EMAIL = :EMAIL`, { EMAIL: { val: req.body.email } });
      if (bcrypt.compareSync(req.body.password, result.rows[0][0])) {
        result = await connection.execute(`SELECT l.SSN, c.cust_name FROM login l, customer c WHERE email = :EMAIL and l.ssn = c.ssn`, { EMAIL: { val: req.body.email } });
        res.send({
          data: "Success",
          firstname: result.rows[0][1].split(" ")[0],
          lastname: result.rows[0][1].split(" ")[1],
          ssn: result.rows[0][0]
        });
      } else {
        res.send({
          data: "Incorrect password"
        });
      }
    }
  })
  .post("/signup", async function (req, res) {
    let email = req.body.email;
    let firstName = req.body.firstname;
    let lastName = req.body.lastname;
    let address = req.body.address;
    let ssn = req.body.ssn;
    let password = req.body.password;
    let passwordConfirm = req.body.passwordconfirm;
    let returnVal = {};
    if (!email || email == "") {
      returnVal = {
        data: "Please enter an email address.",
      };
      res.send(returnVal);
    } else if (!firstName || firstName == "") {
      returnVal = {
        data: "Please enter your first name.",
      };
      res.send(returnVal);
    } else if (!lastName || lastName == "") {
      returnVal = {
        data: "Please enter your last name.",
      };
      res.send(returnVal);
    } else if (!address || address == "") {
      returnVal = {
        data: "Please enter your address.",
      };
      res.send(returnVal);
    } else if (ssn.length != 9 || !/[0-9]{9}/.test(ssn)) {
      returnVal = {
        data: "Please enter a valid SSN.",
      };
      res.send(returnVal);
    }

    resultEmail = await connection.execute(`SELECT COUNT(*) FROM LOGIN WHERE EMAIL = :EMAIL`, { EMAIL: { val: email } });
    resultSSN = await connection.execute(`SELECT COUNT(*) FROM LOGIN WHERE SSN = :SSN`, { SSN: { val: ssn } });
    if (resultEmail.rows[0][0] != 0) {
      res.send({
        data: "There is already an account associated with this email address."
      });
    } else if (resultSSN.rows[0][0] != 0) {
      res.send({
        data: "There is already an account associated with this SSN."
      });
    } else if (
      !(
        /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u.test(
          firstName
        ) &&
        /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u.test(
          lastName
        )
      )
    ) {
      returnVal = {
        data: "Invalid Name",
      };
      res.send(returnVal);
    } else if (
      !/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
        email
      )
    ) {
      returnVal = {
        data: "Invalid email address.",
      };
      res.send(returnVal);
    } else if (password.length <= 6) {
      returnVal = {
        data: "Please choose a password that is longer than 6 characters.",
      };
      res.send(returnVal);
    } else if (password != passwordConfirm) {
      returnVal = {
        data: "Your passwords do not match.",
      };
      res.send(returnVal);
    } else {
      await connection.execute(`INSERT INTO CUSTOMER VALUES (:SSN, :NAME, null, :ADDRESS )`
        , { SSN: { val: ssn }, NAME: { val: firstName + " " + lastName }, ADDRESS: { val: address } });
      await connection.execute(`INSERT INTO LOGIN VALUES (:EMAIL, :PASSWORD, :SSN )`
        , { EMAIL: { val: email }, PASSWORD: { val: hash(password) }, SSN: { val: ssn } });
      await connection.commit();
      res.send({
        data: "Success"
      });
    }

  })
  .post("/getBranches", async function (req, res) {
    let result = await connection.execute(`select branch_id, branch_name, branch_bank_name from branch`);
    res.send({ result: result.rows });
  })
  .post("/addAccount", async function (req, res) {
    let branchid = req.body.branchid;
    let branchname = req.body.branchname;
    let ssn = req.body.ssn;
    let amount = req.body.amount;
    let accounttype = req.body.accounttype;
    let result = await connection.execute(`select Count(*) from account`);
    let accountNum = result.rows[0][0] + 100;
    await connection.execute(`insert into account values(:ACCOUNTID, :BRANCHID, :BRANCHNAME)`
      , { ACCOUNTID: { val: accountNum }, BRANCHID: { val: branchid }, BRANCHNAME: { val: branchname } });
    await connection.execute(`insert into holds_access values(:ACCOUNTID, :SSN, SYSDATE)`
      , { ACCOUNTID: { val: accountNum }, SSN: { val: ssn } });
    await connection.execute(`insert into holds_balance values(:ACCOUNTID, :BALANCE)`
      , { ACCOUNTID: { val: accountNum }, BALANCE: { val: amount } });
    if (accounttype == 0) {
      await connection.execute(`insert into savings_acct values(:ACCOUNTID, 0.1)`
        , { ACCOUNTID: { val: accountNum } });
    } else if (accounttype == 1) {
      await connection.execute(`insert into checking_acct values(:ACCOUNTID, 100)`
        , { ACCOUNTID: { val: accountNum } });
    } else if (accounttype == 2) {
      await connection.execute(`insert into money_market_acct values(:ACCOUNTID, 0.1)`
        , { ACCOUNTID: { val: accountNum } });
    } else if (accounttype == 3) {
      let result = await connection.execute(`select Count(*) from loan`);
      let loanNum = result.rows[0][0] + 1;
                                    
      let repayAmount = Math.round(((amount * ((0.015 / 12) * (Math.pow((1 + 0.015 / 12), 60))) / (Math.pow((1 + (0.075 / 12)), 60) - 1)) + Number.EPSILON) * 100) / 100;
      await connection.execute(`insert into loan values(:LOANID, :ACCOUNTID, :AMOUNT, :REPAY, 1.5)`
        , { ACCOUNTID: { val: accountNum }, LOANID: { val: loanNum }, AMOUNT: { val: amount }, REPAY: { val: repayAmount } });
    }
    connection.commit();
    res.sendStatus(200);
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

function hash(value) {
  let salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(value, salt);
}