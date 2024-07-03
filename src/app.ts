import express, { Application, Request, Response } from "express";
import cors from "cors";

import router from "./app/routes";
import notFound from "./app/middlewears/notFound";
import globalErrorHandler from "./app/middlewears/globalErrorHandler";

const app: Application = express();
app.use(express.json());
app.use(cors());
app.use("/api", router);
app.use(globalErrorHandler);

app.get("/", (req: Request, res: Response) => {
    res.send("server is running");
});

app.use(notFound);

export default app;