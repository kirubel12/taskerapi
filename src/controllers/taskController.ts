

import {Task} from '../models/taskModel.js'
import type { Context } from 'hono';



export const getTasks = async(c:Context) => {
    try {
        const tasks = await Task.find();
        
        if (tasks.length > 0) {
            return c.json({
                success: true,
                data: tasks,
                message: 'Tasks fetched successfully'
            });
        } else {
            return c.json({
                success: true,
                message: 'No tasks created yet'
            });
        }
    } catch (error) {
        throw new Error('Error fetching tasks');
    }
}





export const createTask = async (c:Context) => {
    try {
        const { title, description, priority } = await c.req.json();
        const task = new Task({
            title,
            description,
            priority
        });
        await task.save();
        return c.json({
            success: true,
            data: task,
            message: 'Task created successfully'
        });
    } catch (error) {
        throw new Error('Error creating task')
    }
}



export const updateTask = async (c:Context) => {
    try {
        const { id } = c.req.param();
        const { title, description, completed, priority } = await c.req.json();
        const task = await Task.findByIdAndUpdate(id, {
            title,
            description,
            completed,
            priority
        }, { new: true });
        if (!task) {
            return c.json({
                success: false,
                message: 'Task not found under that id'
            });
        }
        return c.json({
            success: true,
            data: task,
            message: 'Task updated successfully'
        });
    } catch (error) {
        throw new Error('Error updating task')
    }
}


export const deleteTask = async (c:Context) => {
    try {
        const { id } = c.req.param();
        const task = await Task.findByIdAndDelete(id);
        if (!task) {
            return c.json({
                success: false,
                message: 'Task not found under that id'
            });
        }
        return c.json({
            success: true,
            message: 'Task deleted successfully'
        });
    } catch (error) {
        throw new Error('Error deleting task')
    }
}