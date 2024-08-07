import { OpenAPIV3 } from 'openapi-types';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Express API with Swagger',
    version: '1.0.0',
    description: 'A simple Express API application documented with Swagger',
  },
  servers: [
    {
      url: 'http://localhost:3000',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  }
};

const options = {
  swaggerDefinition,
  apis: [
    './src/**/*.ts',
    './src/**/*.js',
  ], // Path to the API docs
};

export default options;