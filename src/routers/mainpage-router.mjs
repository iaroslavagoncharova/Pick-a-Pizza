import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mainRouter = express.Router();

mainRouter
/**
 * @api {get} /api Get main page
 * @apiVersion 1.0.0
 * @apiName getMainPage
 * @apiGroup Main
 * @apiPermission all
 * 
 * @apiSuccess {Page} main Main page.
 * 
 */
.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/mainpage/mainpage.html'))
});
export default mainRouter;