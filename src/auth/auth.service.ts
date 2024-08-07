import { Model } from "mongoose";
import { IService } from "../core/interfaces/service.interface";
import { UserModel } from "../core/models/user.model";
import { Request } from "../core/types/core-types/request.type";
import { Response } from "../core/types/core-types/response.type";
import { RegisterDto } from "./dto/register.dto";
import { User } from "../core/types/business-types/user.type";
import { LoginDto } from "./dto/login.dto";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { jwt_config } from "../config";
import { Payload } from "./types/payload";

export class AuthService implements IService {

  constructor(
    private readonly userModel: Model<User> = UserModel
  ) {}

  name = "auth";

  async register(request: Request, response: Response): Promise<void> {
    const userCredentials: RegisterDto = request.body;

    const user = await this.userModel.create(userCredentials);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user.toObject();

    response.send(userWithoutPassword);
  }

  async login(request: Request, response: Response): Promise<void> {
    const userLogin: LoginDto = request.body;

    const user = await this.userModel.findOne({ email: userLogin.email });

    if (!user) {
      response.status(404).send("User not found");
      return;
    }

    const isPasswordValid = await this.validatePassword(userLogin.password, user.password);

    if (!isPasswordValid) {
      response.status(401).send("Invalid password");
      return;
    }

    const token = await this.generateJwtToken(user);
    const refreshToken = await this.generateRefreshToken(user);

    response.send({ token, refreshToken });


  }

  checkToken(request: Request, response: Response): void {
    const token = request.headers.authorization;

    if (!token) {
      response.status(401).send("No token provided");
      return;
    }

    jwt.verify(token.split(" ")[1], jwt_config.secret as string, (err, decoded) => {
      if (err) {
        response.status(401).send("Invalid token");
        return;
      }

      response.send(decoded);
    });
  }

  refreshToken(request: Request, response: Response): void {
    const refreshToken = request.headers["x-refresh-token"];

    if (!refreshToken) {
      response.status(401).send("No token provided");
      return;
    }

    jwt.verify(refreshToken as string, jwt_config.secret as string, (err, decoded) => {
      if (err) {
        response.status(401).send("Invalid token");
        return;
      }

      if (!decoded) {
        response.status(401).send("Invalid token");
        return;
      }

      const payload = decoded as Payload;


      const token = jwt.sign({
        userId: payload.userId,
        email: payload.email
      }, jwt_config.secret as string, { expiresIn: jwt_config.expiresIn });

      response.send({ token });
    });
  }

  private async validatePassword(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private async generateJwtToken(user: User): Promise<string> {

    const payload = {
      userId: user._id,
      email: user.email,
    };

    const token = jwt.sign(payload, jwt_config.secret as string, { expiresIn: jwt_config.expiresIn });

    return token;
  }

  private async generateRefreshToken(user: User): Promise<string> {
    const refreshToken = jwt.sign({
      userId: user._id,
      email: user.email,
    }, jwt_config.secret as string, { expiresIn: jwt_config.refreshExpiresIn });
    return refreshToken;
  }
}