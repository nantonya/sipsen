const Joi = require('joi');

const documento = Joi.string();
const codigo = Joi.string().min(11).max(11);

const dataSipsenSchema = Joi.object({
  documento: documento.required(),
  codigo: codigo.required(),
});



module.exports = { dataSipsenSchema }
