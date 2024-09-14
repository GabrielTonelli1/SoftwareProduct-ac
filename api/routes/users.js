import express from "express";
import { getUsers, addUser, upDataUser, deleteUser } from "../controllers/user.js";

const router = express.Router();

router.get("/", getUsers);

router.post("/", addUser);

router.put("/:id", upDataUser);

router.delete("/:id", deleteUser);

export default router;