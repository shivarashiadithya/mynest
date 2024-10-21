import { Controller, Post, Body, Res } from '@nestjs/common';
import { DocumentService } from './document.service';
import { Response } from 'express';

@Controller('document')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Post('generate')
  async generateDocument(@Body() jsonData: any, @Res() res: Response) {
    const templatePath = './template.docx';
    const outputPath = 'C:/Users/AdithyaShivarashi/Downloads/output.docx';

    await this.documentService.generateDocumentFromTemplate(
      jsonData,
      templatePath,
      outputPath,
    );

    res.download('C:/Users/AdithyaShivarashi/Downloads/output.docx');
  }
}
