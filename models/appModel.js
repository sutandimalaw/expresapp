const sql = require("./db.js");

const Product = function (product) {
    this.title = product.title;
    this.price = product.price;
};

Product.getProducts = (searchVal, start, length, result) => {
    var columns     = ['title', 'price'];
    var columns2    = ['title'];
    var alias       = ['totalCount'];
    var alias2      = ['totalCountFiltered'];
    var table       = ['product'];
    var value       = ['%' + searchVal + '%'];
    var offset      = parseInt(start);
    var limit       = parseInt(length);
    var arr         = new Array();

    sql.query("SELECT ?? FROM ?? WHERE title LIKE ? LIMIT ?, ?", [columns, table, value, offset, limit], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        arr.push(res);
    });

    sql.query("SELECT COUNT(??) AS ?? FROM ??", [columns2, alias, table], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        arr.push(res);
    });

    sql.query("SELECT COUNT(??) AS ?? FROM ?? WHERE title LIKE ? LIMIT ?, ?", [columns2, alias2, table, value, offset, limit], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        arr.push(res);
    });

    setTimeout(() => {
        result(null, arr);
    }, 700);
}

module.exports = Product;