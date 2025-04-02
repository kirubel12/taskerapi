import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import  {connectDB}  from "./db/mongoose.js"
import taskRoutes from "./routes/taskRoutes.js"

const app = new Hono()


app.route('/api/tasks', taskRoutes)

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

const startServer = async () => {
  try {
    await connectDB(); // Connect to MongoDB
    serve({
      fetch: app.fetch,
      port: 3000,
    }, (info) => {
      console.log(`Server is running on http://localhost:${info.port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
  }
};

startServer();