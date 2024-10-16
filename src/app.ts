import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import allRoutes from './app/routes';
import path from "path"
import globalErrorHandler from './app/middlewares/globalErrorHandler';

const app: Application = express();


const formatDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric', // Include seconds
    hour12: true,
  };
  return new Intl.DateTimeFormat('en-US', options).format(date);
};

// Middleware to log requests and responses
const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const method = req.method;
  const url = req.url;
  const query = JSON.stringify(req.query, null, 2); // Log query
  const params = JSON.stringify(req.params, null, 2); // Log params
  const formattedDate = formatDate(new Date());

  console.log('------------------------');
  console.log(
    `Api :- \x1b[0m\x1b[34m${method}\x1b[0m \x1b[32m${url}\x1b[0m \x1b[36m[${formattedDate}]\x1b[0m`
  );
  console.log('Query:', query); // Log the query
  console.log('Params:', params); // Log the params
  console.log('------------------------');

  next();
};


// Middleware setup
app.use(
  cors({
    origin: ['http://localhost:5173'],
    credentials: true,
  })
);
app.use(express.json());
app.use(requestLogger);

// Serve static files from the public directory
const publicDirPath = path.join(__dirname, '..', 'public');
app.use(express.static(publicDirPath));

// Use routes
app.use('/api/v1', allRoutes);

// Test route
const test = (req: Request, res: Response) => {
  res.send('Hello NewBie!');
};
app.get('/', test);

// Global error handler
app.use(globalErrorHandler);

// Handle 404 - Not Found
app.all('*', (req: Request, res: Response) => {
  res.status(404).json({ success: false, message: `Route Is Not Found ${req.url}` });
});

export default app;