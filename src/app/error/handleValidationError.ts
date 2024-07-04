import mongoose from "mongoose";
import { TErrorIssue, TErrorResponse } from "../types/error.types";


const handleValidationError = (err: mongoose.Error.ValidationError): TErrorResponse => {
    const errorIssues: TErrorIssue[] = Object.values(err.errors).map((value) => {
        return {
            path: value.path,
            message: value.message,
        };
    });
    return {
        statusCode: 400,
        error: "Validation Error",
        message: errorIssues.map((value) => value.message).join(" "),
        errorDetails: {
            issues: errorIssues,
            name: err.name,
        },
    };
};

export default handleValidationError;
