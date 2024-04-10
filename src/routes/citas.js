const express = require('express');
const router = express.Router();
const citasController = require('../controllers/citasController');
const authMiddleware = require('../middleware/authMiddleware');
const citaSwaggerSchema = require('../schemas/citaSchema');


/**
 * @swagger
 * tags:
 *   name: Citas
 *   description: Endpoints para confirmar y cancelar citas
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     citaSchema:
 *       type: object
 *       properties:
 *         message_id:
 *           type: string
 *         message:
 *           type: string
 *         response:
 *           type: object
 *           properties:
 *             unique_id:
 *               type: integer
 *             schedule_type:
 *               type: string
 *         status:
 *           type: string
 *       required:
 *         - message_id
 *         - message
 *         - response
 *         - status
 */

/**
 * @swagger
 * /scheduling/v1/appointments/confirm-response:
 *   post:
 *     summary: Confirmar cita
 *     tags: [Citas]
 *     description: Endpoint para recibir datos de confirmar una cita
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/citaSchema'
 *     responses:
 *       200:
 *         description: Respuesta de confirmación de cita
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */

router.post('/confirm-response', authMiddleware, citasController.confirmarCita);


/**
 * @swagger
 * /scheduling/v1/appointments/cancel-response:
 *   post:
 *     summary: Cancelar cita
 *     tags: [Citas]
 *     description: Endpoint para recibir datos de cancelación de cita
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/citaSchema'
 *     responses:
 *       200:
 *         description: Respuesta de cancelación de cita
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
router.post('/cancel-response', authMiddleware, citasController.cancelarCita);

module.exports = router