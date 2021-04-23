import express from "express";
import {Express} from "express-serve-static-core";
import cors from "cors";
import absences from "./data/absences.json";
import members from "./data/members.json";

const app: Express = express();
app.use(cors());

app.get("/absences", (req: express.Request, res: express.Response) => {
    res.send(absences);
});

app.get("/members", (req: express.Request, res: express.Response) => {
    res.send(members);
});

const port: number = 4000;
app.listen(port, () => {
    console.log(`Listening on ${port}`);
});
