/**
 * @swagger
  * components:
  *  schemas:
  *   LoginDto:
  *    type: object
  *    properties:
  *     email:
  *      type: string
  *      description: The user's email
  *      required: true
  *     password:
  *      type: string
  *      description: The user's password
  *      required: true
 */
export interface LoginDto {
  email: string;
  password: string;
} 