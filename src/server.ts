/* eslint-disable no-console */
import { Server } from 'http';
import mongoose from "mongoose";
import config from "./app/config";
import app from "./app";



let server: Server;

async function main() {
    try {
        await mongoose.connect(config.database_url as string);
        console.log("Connected to MongoDB");
        server = app.listen(config.port, () => {
            console.log(`Example app listening on port ${config.port}`);
        });
    } catch (error) {
        console.log(error, "Error in connecting to MongoDB");
    }
}

main().catch((err) => console.log(err, "Error in starting server"));




process.on('unhandledRejection', (err) => {
    console.log(`😈 unahandledRejection is detected , shutting down ...`, err);
    if (server) {
      server.close(() => {
        process.exit(1);
      });
    }
    process.exit(1);
  });
  
  process.on('uncaughtException', () => {
    console.log(`😈 uncaughtException is detected , shutting down ...`);
    process.exit(1);
  });
  


