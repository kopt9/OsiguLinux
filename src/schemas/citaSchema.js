const Joi = require('joi');
const joiToSwagger = require('joi-to-swagger');

const citaSchema = Joi.object({
    message_id: Joi.string().required(),
    message: Joi.string().required(),
    response: Joi.object({
        unique_id: Joi.number().integer().required(),
        schedule_type: Joi.string().required()
    }).required(),
    status: Joi.string().required()
});

const { swagger: citaSwaggerSchema } = joiToSwagger(citaSchema);


module.exports = { citaSchema, citaSwaggerSchema };