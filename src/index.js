import express from 'express';
import path from 'path';
import mainRouter from './routers/mainpage-router.mjs';
import accRouter from './routers/account-router.mjs';
import mapPageRouter from './routers/map-page-router.mjs';
import joinPageRouter from './routers/join-router.mjs';
import pizzaRouter from './routers/make-pizza-router.mjs';
import cartRouter from './routers/shopping-cart-router.mjs';
import jobApplicationRouter from './routers/jobs-router.mjs';
import signinPageRouter from './routers/login-register-router.mjs';
import { fileURLToPath } from 'url';
import loginRouter from './routers/login-router.mjs';
import registRouter from './routers/register-router.mjs';

const hostname = '127.0.0.1';
const port = 3000;

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files (like HTML, CSS, and JavaScript)
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());

// page navigation routers
app.use('/', mainRouter);
app.use('/sign-in', signinPageRouter);
app.use('/my-account', accRouter);
app.use('/directions', mapPageRouter);
app.use('/pick-a-pizza-club', joinPageRouter);
app.use('/make-your-pizza', pizzaRouter);
app.use('/shopping-cart', cartRouter);
app.use('/join-us', jobApplicationRouter);

// routers for database interaction
app.use('/login', loginRouter);
app.use('/register', registRouter);



app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });