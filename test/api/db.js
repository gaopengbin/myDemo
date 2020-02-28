var mysql = require("mysql");
var bcrypt = require("bcrypt-nodejs");
const findOne = "SELECT name,password FROM ppp WHERE name=?";
const getSql = "SELECT * FROM ppp";
const addSql = "INSERT INTO ppp set ?";
const updateSql = "UPDATE ppp SET name = ?where id=? ";
const delSql = 'DELETE FROM ppp where name="admin"';
const connection = {
  host: "127.0.0.1",
  port: "3306",
  user: "root",
  password: "wasdjkluiop",
  database: "demo"
};
const pool = mysql.createPool({
  host: "127.0.0.1",
  port: "3306",
  user: "root",
  password: "wasdjkluiop",
  database: "demo",
  multipleStatements: true
});
module.exports = {
  login(req, res, next) {
    console.log(req.body);
    var response = {
      name: req.body.name,
      password: req.body.password
    };
    pool.getConnection((err, connection) => {
      if (err) {
        console.log(err);
      }
      connection.query(findOne, response.name, function(err, result) {
        if (err) {
          console.log(err);
        }
        if (result == "") {
          res.end("用户不存在！");
        } else {
          console.log(response.password);
          console.log(result[0].password);

          const pwdMatch = bcrypt.compareSync(
            response.password,
            result[0].password
          );

          if (pwdMatch) {
            res.send("登陆成功！");
          } else {
            res.send("密码错误！");
          }
        }
      });
    });
  },
  getApp(req, res, next) {
    var str = "";
    pool.getConnection((err, connection) => {
      console.log("mysql连接成功！");
      connection.query(getSql, function(err, result) {
        if (err) {
          return callback(err);
        }
        res.json(result);
        connection.release();
      });
    });
  },
  addApp(req, res, next) {
    pool.getConnection((err, connection) => {
      let password = req.body.password;
      //生成salt的迭代次数
      const saltRounds = 10;
      //随机生成salt
      const salt = bcrypt.genSaltSync(saltRounds);
      //获取hash值
      var hash = bcrypt.hashSync(password, salt);
      console.log("hash:" + hash);
      password = hash;
      var addSql_Params = {
        //id: req.body.id,
        name: req.body.name,
        age: req.body.age,
        password: password
      };
      connection.query(addSql, addSql_Params, function(err, result) {
        res.json(result);
        connection.release();
      });
    });
  },
  update(req, res, next) {
    pool.getConnection((err, connection) => {
      var update_Params = [(name = req.body.name), (id = req.body.id)];
      console.log("连接了数据库" + req.body.name);
      connection.query(updateSql, update_Params, function(err, result) {
        if (err) {
          console.log(err);
        }
        console.log("请求了update" + result);
        res.json(result);
        connection.release();
      });
    });
  },
  delete(req, res, next) {
    pool.getConnection((err, connection) => {
      // var del_Params = {
      //     name: req.body.name
      // };
      connection.query(delSql, function(err, result) {
        if (err) {
          console.log(err);
        }
        res.json(result);
        connection.release();
      });
    });
  }
};
