const headers = require("./headers");
const handleError = (res, err) => {
  res.writeHead(400, headers);
  res.write(
    JSON.stringify({
      status: false,
      message: err.message ? err.message : "資料有誤或無此 id",
    })
  );
  res.end();
};
module.exports = handleError;