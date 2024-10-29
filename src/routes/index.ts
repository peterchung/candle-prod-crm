import express from 'express';
const router = express.Router();
import mondayRoutes from './monday';
import { getAllFragrances } from '../controllers/fragrance-controller';

router.use(mondayRoutes);

router.get('/get_fragrance_list', getAllFragrances, (req, res) => {
  res.status(200).json(res.locals.data);
});

// serve client app
router.use(express.static('client/build'));

router.get('/', function (req, res) {
  res.json(getHealth());
});

router.get('/health', function (req, res) {
  res.json(getHealth());
  res.end();
});

router.get('/view', function (req, res) {
  res.sendFile('index.html', { root: 'client/build/' });
});

function getHealth() {
  return {
    ok: true,
    message: 'Healthy',
  };
}

export default router;
