import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from "@nestjs/swagger";

const config = new DocumentBuilder()
.setTitle('Formation example')
.setDescription('The Formation API description')
.setVersion('1.0')
.addBearerAuth(
  {
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
  },
  'authorization',
)
.build();

const options: SwaggerDocumentOptions =  {
  operationIdFactory: (
    controllerKey: string,
    methodKey: string
  ) => methodKey
};

export {options,config}