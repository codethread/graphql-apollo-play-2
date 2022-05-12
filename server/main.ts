import express from 'express';
import cors from 'cors';
import { handleReq } from './handleReq';

const app = express();
app.use(cors());

app.get('/', handleReq);

export const viteNodeApp = app;
