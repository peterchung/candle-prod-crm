import { Router } from 'express';
const router = Router();

import * as transformController from '../controllers/transform-controller';
import { authenticationMiddleware } from '../middlewares/authentication';
import * as fragranceController from '../controllers/fragrance-controller';
import * as productionController from '../controllers/production-controller';
// import * as webhookMiddleware from '../middlewares/webhook';

router.post(
  '/monday/execute_action',
  authenticationMiddleware,
  transformController.executeAction
);
router.post(
  '/monday/get_remote_list_options',
  authenticationMiddleware,
  transformController.getRemoteListOptions
);

router.post(
  '/monday/add_new_fragrance',
  authenticationMiddleware,
  fragranceController.addNewFragrance
);

router.post(
  '/monday/update_fragrance_value',
  authenticationMiddleware,
  fragranceController.updateFragranceValue
);

router.post('/monday/delete_fragrance', fragranceController.deleteFragrance);

router.post(
  '/monday/add_order',
  authenticationMiddleware,
  productionController.addOrder
);

export default router;
