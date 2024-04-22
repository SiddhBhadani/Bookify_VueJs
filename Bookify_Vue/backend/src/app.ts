import 'reflect-metadata';
import * as express from "express";
import * as cors from 'cors';
import * as bodyParser from 'body-parser'; 
import { createConnection } from 'typeorm';
import routes from './routes';

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

createConnection().then(async (connection) => {
  console.log('Database Connection Successful.');
  app.use("/" , routes )
  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });
});
