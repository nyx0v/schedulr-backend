import { Router } from 'express';

import { Request } from "../core/types/core-types/request.type";
import { Response } from "../core/types/core-types/response.type";

import { AuthService } from './auth.service';
import { AuthMiddleware } from './auth.middleware';

export class AuthRouter {
  constructor(
    readonly router: Router = Router(),
    private readonly authService = new AuthService()
  ) {
    /**
     * @swagger
     * /auth/login:
     *  post:
     *    tags:
     *     - Auth
     *    summary: Login
     *    description: Login
     *    requestBody:
     *      required: true
     *      content:
     *        application/json:
     *          schema:
     *            $ref: '#/components/schemas/LoginDto'
     *    responses:
     *      200:
     *        description: OK
     *      401:
     *        description: Unauthorized
     *      404:
     *        description: Not Found
     *      500:
     *        description: Internal Server Error
     */
    this.router.post('/login', this.handleLogin(this.authService));

    /**
     * @swagger
     * /auth/register:
     *  post:
     *    tags:
     *     - Auth
     *    summary: Register
     *    description: Register
     *    requestBody:
     *      required: true
     *      content:
     *        application/json:
     *          schema:
     *            $ref: '#/components/schemas/RegisterDto'
     *    responses:
     *      200:
     *        description: OK
     *      500:
     *        description: Internal Server Error
     */
    this.router.post('/register', [AuthMiddleware.hashPassword], this.handleRegister(this.authService));

    /**
     * @swagger
     * /auth/check:
     *  post:
     *    tags:
     *     - Auth
     *    summary: Check Token
     *    description: Check Token
     *    security:
     *     - bearerAuth: []
     *    responses:
     *      200:
     *        description: OK
     *      401:
     *        description: Unauthorized
     *      500:
     *        description: Internal Server Error
     */
    this.router.post('/check', this.handleCheck(this.authService));
    /**
     * @swagger
     * /auth/refresh:
     *  post:
     *    tags:
     *     - Auth
     *    summary: Refresh Token
     *    description: Refresh Token
     *    parameters:
     *      - in: header
     *        name: X-REFRESH-TOKEN
     *        required: true
     *        schema:
     *          type: string
     *    responses:
     *      200:
     *        description: OK
     *      401:
     *        description: Unauthorized
     *      500:
     *        description: Internal Server Error
     */
    this.router.post('/refresh', this.handleRefresh(this.authService));
  }
  
  private handleLogin(authService: AuthService): (req: Request, res: Response) => void {
    return (req: Request, res: Response) => authService.login(req, res);
  }

  private handleRegister(authService: AuthService): (req: Request, res: Response) => void {
    return (req: Request, res: Response) => authService.register(req, res);
  }

  private handleCheck(authService: AuthService): (req: Request, res: Response) => void {
    return (req: Request, res: Response) => authService.checkToken(req, res);
  }

  private handleRefresh(authService: AuthService): (req: Request, res: Response) => void {
    return (req: Request, res: Response) => authService.refreshToken(req, res);
  }
}

export default new AuthRouter();