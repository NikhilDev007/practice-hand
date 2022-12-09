import { Controller, Get, Header, HostParam, HttpCode, Post, Query, Redirect, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/cats')
  findAll(@Req() request: Request): string {
    return 'This action returns all cats'
  }

  @Post()
  @Header('Cache-Control', 'check')
  create(): string {
    return 'This action adds a new cat';
  }

  // api to redirect to website
  // on portman it wont work, use broswer and localhost.
  @Get('razorpay')
  @Redirect('https://payroll.razorpay.com/dashboard', 302)
  getDocs(@Query('version') version) {
    if (version && version === '5') {
      return { url: 'https://payroll.razorpay.com/dashboard' };
    }
  }

  
}
