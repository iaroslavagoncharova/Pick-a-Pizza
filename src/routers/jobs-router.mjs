import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const jobApplicationRouter = express.Router();

jobApplicationRouter
/**
 * @api {get} /api/join-us Get work page
 * @apiVersion 1.0.0
 * @apiName getWorkPage
 * @apiGroup Work
 * @apiPermission all
 * 
 * @apiSuccess {Page} work Work page.
 * 
 */
.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/work/work.html'));
});

export default jobApplicationRouter;