import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const accRouter = express.Router();

accRouter
/**
 * @api {get} /api/my-account Get account page
 * @apiVersion 1.0.0
 * @apiName getAccount
 * @apiGroup Account
 * @apiPermission user (self)
 * 
 * @apiSuccess {Page} my-account Account page.
 * 
 */
.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/profile/profile.html'));
})

accRouter
/**
 * @api {get} /api/my-account/admin Get admin account page
 * @apiVersion 1.0.0
 * @apiName getAdminAccount
 * @apiGroup Account
 * @apiPermission admin
 * 
 * @apiSuccess {Page} my-account Account page.
 */
.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/admin-profile/admin-profile.html'));
});

export default accRouter;