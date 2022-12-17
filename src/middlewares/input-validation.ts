import {NextFunction, Request, Response} from "express";
import {validationResult} from "express-validator";

export const basicAuthorisation = (req: Request, res: Response, next: NextFunction) => {
    const loginPass = req.headers.authorization;
    if (loginPass === "Basic YWRtaW46cXdlcnR5") {
        next()
    } else {
        return res.status(401).end()
    }
}


const myValidationResult = validationResult.withDefaults({
    formatter: error => {
        return {
            "message": error.msg,
            "field": error.param
        };
    },
});

export const inputValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const errors = myValidationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errorsMessages: errors.array() });
    } else {
        next()
    }
}

