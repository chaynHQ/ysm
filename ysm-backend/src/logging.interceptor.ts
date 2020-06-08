import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Request } from 'express';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private logger: Logger = new Logger('Interceptor');

  intercept(context: ExecutionContext, next: CallHandler): Observable<void> {
    const req = context.switchToHttp().getRequest() as Request;

    const commonMessage = `${req.method} "${req.originalUrl}" for ${req.ip}`;

    this.logger.log(`Started ${commonMessage}`);

    const now = Date.now();

    return next.handle().pipe(
      tap(() => {
        this.logger.log(`Completed ${commonMessage} in ${Date.now() - now}ms`);
      }),
      catchError((err) => {
        this.logger.error(
          `Failed ${commonMessage} - status: ${err.status}, message: ${err.message} - in ${
            Date.now() - now
          }ms`,
        );
        return throwError(err);
      }),
    );
  }
}
