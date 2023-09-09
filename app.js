// Required modules
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const exercisesRoutes = require('./routes/exercise');
const languagesRoutes = require('./routes/language');
const topicsRoutes = require('./routes/topic');
const blogRoutes = require('./routes/blog');
const quizRoutes = require('./routes/quiz');
const userRoutes = require('./routes/user');

// Create express application
const app = express();

// CORS middleware
app.use(cors());

// Set template engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

/* === GLOBAL MIDDLEWARE === */

// Serving static files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Set security HTTP headers
app.use(helmet({ contentSecurityPolicy: false }));

// Development logging using morgan only in 'development' environment
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limit requests from the same API using express-rate-limit
const limiter = rateLimit({
  max: 999,
  windowMs: 60 * 60 * 1000, // 1 hour window
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Reading cookies using cookie-parser
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS (Cross-site Scripting) attacks
// Commented out since it removes the html tags
/* app.use(xss()); */

// Add requested time to the req object
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

/* === ROUTES === */

// Default route
app.get('/', async (req, res, next) => {
  res.send('Hello from the server side!');
});

// API routes
app.use('/api/exercises', exercisesRoutes);
app.use('/api/topics', topicsRoutes);
app.use('/api/languages', languagesRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/users', userRoutes);

// If no routes are matched, send 404 error
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global error handler
app.use(globalErrorHandler);

// Export the app to be used by the server
module.exports = app;
