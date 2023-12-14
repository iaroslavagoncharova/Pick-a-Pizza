import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mapPageRouter = express.Router();

mapPageRouter
/**
 * @api {get} /api/directions Get map page
 * @apiVersion 1.0.0
 * @apiName getMapPage
 * @apiGroup Map
 * @apiPermission all
 * 
 * @apiSuccess {Page} map Map page.
 * 
 */
.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/map/map.html'));
});

export default mapPageRouter;