export type TErrorIssue = {
    path: string | number;
    message: string;
    code?: string;
    expected?: string;
    received?: string;
};
export type TErrorResponse = {
    statusCode: number;
    message: string;
    error: string;
    errorDetails: {
        issues: TErrorIssue[];
        name?: string;
    };
};