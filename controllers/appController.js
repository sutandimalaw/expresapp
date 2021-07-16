const Product = require("../models/appModel.js");

exports.dashboard = (req, res) => {
    res.render("dashboard");
};

exports.search = (req, res) => {
    Product.getProducts(req.body.search['value'], req.body.start, req.body.length, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving database."
            });
        else {
            res.send({
                "draw"              : req.body.draw,
                "recordsTotal"      : data[1][0].totalCount,
                "recordsFiltered"   : data[2][0].totalCountFiltered,
                "data"              : data[0]
            });
        }
    });
};