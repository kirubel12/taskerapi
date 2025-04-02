import mongoose, { Schema, Document } from 'mongoose';

export enum Priority {
    High = 'high',
    Middle = 'middle',
    Low = 'low',
}

export interface ITask extends Document {
    title: string;
    description: string;
    completed: boolean;
    priority: Priority;
    createdAt: Date;
    updatedAt: Date;
}

const taskSchema = new Schema<ITask>({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    priority: {
        type: String,
        enum: Object.values(Priority),
        default: Priority.Middle,
    },
}, {
    timestamps: true,
});

export const Task = mongoose.model<ITask>('Task', taskSchema);