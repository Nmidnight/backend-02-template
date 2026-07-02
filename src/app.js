const express = require('express');
const cors = require('cors');
const logger = require('./middleware/logger');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');
const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');

const app = express();

app.use(cors({
    origin: /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/,
}));
app.use(express.json());
app.use(logger);
app.use('/users', userRoutes);
app.use('/books', bookRoutes);
app.use(notFound);
app.use(errorHandler);

module.exports = app;
