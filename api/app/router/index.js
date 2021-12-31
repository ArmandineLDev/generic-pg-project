const express = require('express');

const genericController = require('../controller/genericController');
const errorController = require('../controller/errorController');

const router = express.Router();

/* generic CRUD */
router.get('/:entity', genericController.getAll);
router.get('/:entity/:id', genericController.getOne);
router.post('/:entity', genericController.createOne);
router.patch('/:entity/:id', genericController.updateOne);
router.delete('/:entity', genericController.deleteAll);
router.delete('/:entity/:id', genericController.deleteOne);

router.use(errorController.error404);
router.use(errorController.error500);

module.exports = router;