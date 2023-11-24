import express from 'express';
import path from 'path';

const authRouter = express.Router();

// TODO: post request with appropriate function
authRouter.get('/sign-in', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'login-register', 'login-register.html'));
});

authRouter.get('/my-account/:id', (req, res) => {
  const userId = req.params.id;
  res.sendFile(path.join(__dirname, 'public', 'profile', 'profile.html'));
})

authRouter.get('/admin/:id', (req, res) => {
  const userId = req.params.id;
  res.sendFile(path.join(__dirname, '..', 'public', 'admin-profile', 'admin-profile.html'));
  // TODO: check user level id, if it corresponds to an administration role, direct to this page
});

export default authRouter;