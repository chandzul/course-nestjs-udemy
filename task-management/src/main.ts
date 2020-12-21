import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';

async function bootstrap() {
  const serverConfig = config.get('server');

  const logger =  new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);

  if (process.env.NODE_ENV === 'development') {
    app.enableCors();
  }

  const port = process.env.PORT || serverConfig.port;
  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}
bootstrap();

/**
 * provider: un array de providers seran disponibles en modulo por inyeccion de dependencias
 * controllers: un array de controladores seran instanciandos dentro el modulo
 * exports: un array de providers para exportar a otros modulos
 * imports: lista de modulos requerido para un modulo determinado, cualquier provider importado de un modulo podra
 *          ser usado por otro modulo via inyeccion de dependicias
 * 
 * Un modulo encapsula una tarea en especifico y puede ser exportada para que se consuma en otros modulos
 * 
 * ForumModule
 * ├ PostModule
 * ├─ UserProfileModule
 * ├ CommentModule
 * ├─ UserProfileModule
 * └ AuthModule
 * 
 */

/**
* Crear modulo via CLI
* ~ nest g module tasks
*/

/**
 * Controllers
 *  -> clases responsables que reciben request y retornan responses al cliente
 *  -> es donde difinimos un path para los resources
 *  -> definimos los verbos HTTP
 */
  
/**
 * Handler
 * Son los metodos dentro una clase controlador, decorado como 
 * @get, @Post, @Delete, etc.
 * estos van antes del nombre de la funcion a la cual queremos acceder, 
 * en resumen definen el verbo http ej: 
 * 
 * HTTP Request: Delete a task
 * DELETE http://localhost:3000/tasts/:id
 * 
 * @Controller('/tasks')
 * export class TasksController {
 *  @Get()
 *  getAllTasks() {}
 * 
 *  @Delete()
 *  deleteTask(){}
 * }
 */

/**
 * Crear controller via CLI
 * ~ nest g controller tasks --no-spec
 * 
 * Un controlador pertenece a un modulo por lo tanto se importa en su definicion
 * @Module({
 *  controllers: [TasksController]
 * })
 */

/**
 * Providers
 * pueden ser inyectados en los constructores
 * un provider pueder un valor plano, una clase, un catory sync/async
 * un provider extiende un modulo
 * puede ser exportado por un modulo y este estara disponible en el otro modulo donde fue importado
 * 
 */

/**
 * Services
 * ~ nest g service tasks --no-spec
 * 
 * logica de negocio
 * un controlador puede tener ligado varios services
 */

/**
 * DTOs ( Data Transfer Object ) 
 * son clases o interfaces donde definimos como o cual debe ser la estructura de
 * de datos que seran procesados en el proyecto de software. 
 * 
 * Un DTO no hay que confundirlo con una defincion de un modelo de base de datos,
 * aunque nos puede ayudar para saber como deben ser los datos en BD.
 * 
 * Este nos puede servir para extraer params de un request de un endpoint, definiendo
 * dentro del dto que paramatros queremos o cuales son los que se van a usar
 */

 /**
  * Pipes
  * son funciones que operan sobre argumentos solo despues de ser llamados
  * estos le hacen algun amodificacion como son limpiar espacion vacios,
  * pasar a mayusculas, aplican algun filtro etc, validacion de tipos ej:
  * 
  * ValidationPipe, ParseIntPipe
  */