import { Module } from '@nestjs/common';
import { DocxController } from './docx.controller';
import { DocxService } from './docx.service';

@Module({
  controllers: [DocxController],
  providers: [DocxService],
})
export class DocxModule {}
