import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './auth.guard';
import { ACGuard, UseRoles, UserRoles } from 'nest-access-control';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(AuthGuard, ACGuard)
  @UseRoles({
    resource: 'video',
    action: 'read',
    possession: 'any',
  })
  @Get()
  root(@UserRoles() userRoles: any) {
    return this.appService.root(userRoles);
  }
}
