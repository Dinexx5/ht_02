"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputValidationMiddleware = exports.basicAuthorisation = void 0;
const express_validator_1 = require("express-validator");
const basicAuthorisation = (req, res, next) => {
    const loginPass = req.headers.authorization;
    if (loginPass === "Basic YWRtaW46cXdlcnR5") {
        next();
    }
    else {
        return res.status(401).end();
    }
};
exports.basicAuthorisation = basicAuthorisation;
const myValidationResult = express_validator_1.validationResult.withDefaults({
    formatter: error => {
        return {
            "message": error.msg,
            "field": error.param
        };
    },
});
const inputValidationMiddleware = (req, res, next) => {
    const errors = myValidationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errorsMessages: errors.array() });
    }
    else {
        next();
    }
};
exports.inputValidationMiddleware = inputValidationMiddleware;
