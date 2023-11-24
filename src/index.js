import express from 'express';
import path from 'path';
import mainRouter from './routers/mainpage-router.mjs';
import authRouter from './routers/auth-router.mjs';
import mapPageRouter from './routers/map-page-router.mjs';
import joinPageRouter from './routers/join-router.mjs';
import pizzaRouter from './routers/make-pizza-router.mjs';
import cartRouter from './routers/shopping-cart-router.mjs';
import jobApplicationRouter from './routers/jobs-router.mjs';

const hostname = '127.0.0.1';
const port = 3000;

const app = express();

// Serve static files (like HTML, CSS, and JavaScript)
app.use(express.static(path.join(__dirname, 'public')));

// routers, WIP
// thus far for navigation only
app.use('/', mainRouter);
app.use('/auth', authRouter);
app.use('/directions', mapPageRouter);
app.use('/pick-a-pizza-club', joinPageRouter);
app.use('/make-your-pizza', pizzaRouter);
app.use('/shopping-cart', cartRouter);
app.use('/join-us', jobApplicationRouter);


app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });