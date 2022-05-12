import express from 'express';
import {handleReq} from "./handleReq";

const app = express();

app.get('/', handleReq)

export const viteNodeApp = app;