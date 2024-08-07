/**
 * @swagger
 * components:
 *  schemas:
 *   RegisterDto:
 *    type: object
 *    required:
 *      - email
 *      - password
 *      - name
 *    properties:
 *     email:
 *      type: string
 *      description: The user's email
 *     password:
 *      type: string
 *      description: The user's password
 *     name:
 *      type: string
 *      description: The user's name
 *     preferences:
 *      type: object
 *      properties:
 *       theme:
 *        type: string
 *        enum: ['light', 'dark']
 *        default: 'light'
 *       notificationPreferences:
 *        type: object
 *        properties:
 *         email:
 *          type: boolean
 *          default: true
 *         push:
 *          type: boolean
 *          default: true
 */
export interface RegisterDto {
  email: string;
  password: string;
  name: string;
  preferences?: {
    theme: 'light' | 'dark';
    notificationPreferences: {
      email: boolean;
      push: boolean;
    }
  }
}