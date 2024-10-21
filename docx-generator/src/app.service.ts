import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    const helloMessage = process.env.HELLO_MESSAGE || 'Adithya';
    return helloMessage;
  }
}
