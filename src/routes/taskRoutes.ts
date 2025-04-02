import { Hono } from "hono";
import {createTask,deleteTask,getTasks, updateTask} from "../controllers/taskController.js"


const taskRoutes = new Hono();


taskRoutes.get("/", getTasks);
taskRoutes.post("/", createTask);
taskRoutes.put("/:id", updateTask);
taskRoutes.delete("/:id", deleteTask);


export default taskRoutes;