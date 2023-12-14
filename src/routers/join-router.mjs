import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const joinPageRouter = express.Router();

joinPageRouter
/**
 * @api {get} /api/pick-a-pizza-club Get membership page
 * @apiVersion 1.0.0
 * @apiName getMembershipPage
 * @apiGroup Membership
 * @apiPermission all
 * 
 * @apiSuccess {Page} membership Membership page.
 * 
 */
.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/membership-page/member.html'));
});

export default joinPageRouter;