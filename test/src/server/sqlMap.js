var sqlMap = {
  getValue: "SELECT * FROM ppp WHERE id = ?",
  setValue: "UPDATE ppp SET name = ? WHERE id = ?"
};

module.exports = sqlMap;
