'use strict';

var AccreditationHelper = {};

AccreditationHelper.saveClaims = function (req, res, next) {
    req.session.acr_values = req.query.acr_values;
    next();
};

module.exports = AccreditationHelper;
