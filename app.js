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
const bodyParser = require('body-parser')

const app = express();
//Cors middleware
app.use(cors());
// Set template engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

/* === GLOBAL MIDDLEWARE ===*/

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));
// Set security HTTP headers
app.use(helmet({ contentSecurityPolicy: false }));

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
// Limit requests from same API
const limiter = rateLimit({
  max: 999,
  windowMs: 60 * 60 * 1000, // 1 hour window
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
//Reading cookies
app.use(cookieParser());
// Data sanitization against NoSQL query injection
app.use(mongoSanitize());
// Data sanitization against XSS
app.use(xss());
// Add requested time to the req object
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Mount Routers
app.get('/', async (req, res, next) => {
  console.log('Hello from the server side!');
  res.send('Hello from the server side!');
});


app.use('/api/exercises', exercisesRoutes);
app.use('/api/topics', topicsRoutes);
app.use('/api/languages', languagesRoutes);

// If no routes are matched, send 404
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global error handler
app.use(globalErrorHandler);
module.exports = app;

// app.get('/sitemap.xml', async (req, res) => {
//   const exercises = await Exercise.find({});
//   // Create the sitemap
//   const sitemap = xmlbuilder.create('urlset', { encoding: 'UTF-8' });
//   sitemap.att('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9');

//   // Add each URL to the sitemap
//   exercises.forEach((profile) => {
//     const urlElem = sitemap.ele('url');
//     urlElem.ele(
//       'loc',
//       {},
//       `${process.env.CLIENT_URL}profile/${profile._id}/${profile.firstName}-${profile.lastName}`
//     );
//     urlElem.ele('lastmod', {}, new Date().toISOString());
//     urlElem.ele('changefreq', {}, 'weekly');
//   });

//   // Convert the sitemap to a string and serve it as an XML file
//   const sitemapString = sitemap.end({ pretty: true });
//   res.set('Content-Type', 'application/xml');
//   res.send(sitemapString);
// });