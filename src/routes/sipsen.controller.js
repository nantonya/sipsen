const express = require('express');

const SipsenService = require('../services/sipsen.service');
const validatorHandler = require('../middlewares/validator.handler');
const { dataSipsenSchema } = require('../schemas/sipsen.schema');

const router = express.Router();
const sipsenService = new SipsenService();


router.post('/',
  validatorHandler(dataSipsenSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newProduct = await sipsenService.find(body);
      res.status(201).json(newProduct);
    } catch (error) {
      next(error);
    }
  }
);


module.exports = router;
