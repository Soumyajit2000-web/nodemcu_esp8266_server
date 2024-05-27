import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';
// import dotenv from 'dotenv';

// dotenv.config();

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ESP 8266 Control APIs',
      version: '1.0.0',
      description: '',
    },
    // servers: [
    //   {
    //     url: process.env.SERVER_URL || 'http://localhost:3000',
    //   },
    // ],
  },
  apis: ['./src/modules/digital-module/*.ts'], // Path to the API docs. Add the paths in the array for new modules
};

const swaggerSpec = swaggerJSDoc(options);

export default (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
