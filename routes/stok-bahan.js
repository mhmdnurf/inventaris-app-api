import express, { Router } from "express";
import cors from "cors";
import bodyParser from "body-parser";

const router = express.Router();
router.use(cors());
router.use(bodyParser.json());

export default Router;
