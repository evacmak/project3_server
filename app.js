// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require('dotenv').config();

// ℹ️ Connects to the database
require('./db');

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require('express');

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require('./config')(app);

// 👇 Start handling routes here
const indexRoutes = require('./routes/index.routes');
app.use('/api', indexRoutes);

const authRoutes = require('./routes/auth.routes');
app.use('/auth', authRoutes);

const productRoutes = require('./routes/product.routes');
app.use('/api', productRoutes);

const purchaseRoutes = require('./routes/purchase.routes');
app.use('/api', purchaseRoutes);

const favoritesRoutes = require('./routes/favorites.routes');
app.use('/api', favoritesRoutes);

const reviewsRoutes = require('./routes/reviews.routes');
app.use('/api', reviewsRoutes);

//COMPLETAR COM OS DOIS EXEMPLOS EM CIMA. USAR O CAMINHO E METER SÓ API EM BAIXO

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require('./error-handling')(app);

module.exports = app;
