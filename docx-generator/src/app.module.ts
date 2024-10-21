import { Module } from '@nestjs/common';
import { DocumentService } from './document/document.service';
import { DocumentController } from './document/document.controller';
import { DocxModule } from './docx/docx.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), DocxModule],
  controllers: [AppController, DocumentController],
  providers: [AppService, DocumentService],
})
export class AppModule {}
