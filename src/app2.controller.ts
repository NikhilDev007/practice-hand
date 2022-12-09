import { Controller, Get } from '@nestjs/common';
import { Observable, of } from 'rxjs';
// import { AppService } from './app.service';
// import { Request } from 'express';

@Controller('api2')
export class AdminController {
  @Get()
  findAll(): Observable<any[]> {
    return of([1]);
  }


}