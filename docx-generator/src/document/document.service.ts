import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';

@Injectable()
export class DocumentService {
  async generateDocumentFromTemplate(
    jsonData: any,
    templatePath: string,
    outputPath: string,
  ): Promise<void> {
    try {
      // Load the docx file as binary content
      const content = fs.readFileSync('./template.docx', 'latin1');

      const zip = new PizZip(content);
      const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
      });

      // Render the document (replace all occurrences of {key} by value in jsonData)
      doc.setData(jsonData);
      doc.render();
      const data = 'Testing to insert some data in existing template';

      const buf = doc.getZip().generate({ type: 'nodebuffer' });

      // Save the output document
      fs.writeFileSync('C:/Users/AdithyaShivarashi/Downloads/output.docx', buf);

      fs.promises.appendFile(
        'C:/Users/AdithyaShivarashi/Downloads/output.docx',
        data,
      );
    } catch (error) {
      console.error('Error generating document:', error);
      throw error;
    }
  }
}
