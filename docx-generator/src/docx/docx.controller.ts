// src/docx/docx.controller.ts

import { Controller, Post, Body, Res, Logger } from '@nestjs/common';
import { Response } from 'express';
import { DocxService } from './docx.service'; // Adjust path as necessary

@Controller('docx')
export class DocxController {
  private readonly logger = new Logger(DocxController.name);

  constructor(private readonly docxService: DocxService) {}

  @Post('generate')
  async generateDocx(@Body() conditions: any, @Res() res: Response) {
    const outputPath = 'C:/Users/AdithyaShivarashi/Downloads/template.docx';
    try {
      this.logger.log('Generating DOCX file...');

      const buffer = await this.docxService.generateConditionsDocx(
        conditions,
        outputPath,
      );


      
      this.logger.log('DOCX file generated successfully.');

      //  Send the file as a downloadable response
      res.download(outputPath, (err) => {
        if (err) {
          this.logger.error('Error sending file:', err.message);
          res.status(500).send('Error downloading the file');
        }
      });

      // Set response headers
      //   res.set({
      //     'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      //     'Content-Disposition': 'attachment; filename=conditions_table.docx',
      //   });

      // Set response headers for file download
      // res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
      // res.setHeader('Content-Disposition', 'attachment; filename=conditions_table.docx');

      // // Send the buffer as the response
      // res.send(buffer);

      // this.logger.log('DOCX file sent successfully.');
    } catch (error) {
      this.logger.error(`Error generating DOCX: ${error.message}`);
      res.status(500).send('Failed to generate DOCX file');
    }
  }
}
