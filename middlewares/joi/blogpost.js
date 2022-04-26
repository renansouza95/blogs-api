const Joi = require('joi');

const create = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.array().required(),
});

const update = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.any().forbidden().error(new Error('Categories cannot be edited')),
});

module.exports = { create, update };