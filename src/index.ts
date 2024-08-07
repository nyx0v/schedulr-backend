import cors from 'cors';
import express from 'express';

import authRouter from './auth/auth.router';

import connectDB from './core/db';

import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerOptions from './swaggerConfig';

(async () : Promise<void> => {
  const app = express();
  const port = 3000;

  const swaggerSpec = swaggerJsdoc(swaggerOptions);
  
  await connectDB();
  
  // Enable CORS
  app.use(cors());
  //enable json
  app.use(express.json());
  
  // Mount the auth router
  app.use('/auth', authRouter.router);
  
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
})();

