// src/docx/docx.service.ts

import { Injectable } from '@nestjs/common';
import {
  Document,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  HeadingLevel,
  WidthType,
} from 'docx';
import * as fs from 'fs';
import { COLUMNS } from './docx.constants';

@Injectable()
export class DocxService {
  async generateConditionsDocx(conditions: any, outputPath: string) {
    try {
      // Prepare JSON data

      const actualConditions = conditions.conditions;
      const jsonData_conditions = {
        title: 'Conditions',
        headers: COLUMNS.CONDITIONS.map((condition) => condition.value), // Assuming keys of the first object as headers
        actualConditions,
      };

      const actualProcedures = conditions.procedures;
      const jsonData_procedures = {
        title: 'Procedures',
        headers: COLUMNS.PROCEDURES.map((procedure) => procedure.value), // Assuming keys of the first object as headers
        actualProcedures,
      };

      const actualVitals = conditions.physicalExamination;
      const jsonData_vitals = {
        title: 'VITALS',
        headers: COLUMNS.VITALS.map((vitals) => vitals.value), // Assuming keys of the first object as headers
        actualVitals,
      };
      const actualRequest = conditions.medications;
      const jsonData_medications = {
        title: 'Medication Requests',
        headers: COLUMNS.MEDICATIONREQUESTS.map((req) => req.value),
        actualRequest,
      };

      const actualStatements = conditions.medicationStatements;
      const jsonData_statements = {
        title: 'Medication Statements',
        headers: COLUMNS.STATEMENTS.map((statements) => statements.value),
        actualStatements,
      };

      // Create a new Document with options
      const doc = new Document({
        styles: {
          paragraphStyles: [
            {
              id: 'TableHeader',
              name: 'Table Header',
              basedOn: 'Normal',
              next: 'Normal',
              quickFormat: true,
              run: {
                size: 24, // Font size (in half-points, so 32 is 16pt)
                bold: true,
                color: '000000', // Black color
              },
              paragraph: {
                spacing: {
                  after: 200,
                },
              },
            },
            {
              id: 'TableData',
              name: 'Table Data',
              basedOn: 'Normal',
              next: 'Normal',
              quickFormat: true,
              run: {
                size: 24, // Font size (in half-points, so 24 is 12pt)
              },
              paragraph: {
                spacing: {
                  after: 400,
                },
              },
            },
          ],
        },
        sections: [
          {
            children: [
              new Paragraph({
                text: jsonData_conditions.title,
                heading: HeadingLevel.HEADING_1,
              }),
              new Table({
                width: {
                  size: 10000, // Width of the table
                  type: WidthType.DXA,
                },
                rows: [
                  new TableRow({
                    children: jsonData_conditions.headers.map(
                      (header) =>
                        new TableCell({
                          children: [
                            new Paragraph({
                              text: header,
                              style: 'TableHeader',
                              shading: { fill: 'CCCCCC' },
                            }),
                          ],
                          width: { size: 3000, type: WidthType.DXA }, // Fixed width for each column
                        }),
                    ),
                  }),
                  ...jsonData_conditions.actualConditions.map(
                    (actualCondition) =>
                      new TableRow({
                        children: COLUMNS.CONDITIONS.map((conditionColumn) => {
                          return new TableCell({
                            children: [
                              new Paragraph(
                                actualCondition[conditionColumn.jsonKey]
                                  ? actualCondition[
                                      conditionColumn.jsonKey
                                    ].toString()
                                  : conditionColumn.defaultValue.toString(),
                              ),
                            ],
                          });
                        }),
                      }),
                  ),
                ],
              }),
              new Paragraph({
                text: '', // Add an empty paragraph for spacing between tables
                spacing: {
                  after: 300, // Adjust spacing after the paragraph (example: 200 twips = 0.1 inch)
                },
              }),
              new Paragraph({
                text: 'Procedures',
                heading: HeadingLevel.HEADING_1,
              }),
              new Table({
                width: {
                  size: 10000, // Width of the second table
                  type: WidthType.DXA,
                },
                rows: [
                  new TableRow({
                    children: jsonData_procedures.headers.map(
                      (header) =>
                        new TableCell({
                          children: [
                            new Paragraph({
                              text: header,
                              style: 'TableHeader',
                              shading: { fill: 'CCCCCC' },
                            }),
                          ],
                          width: { size: 3000, type: WidthType.DXA }, // Fixed width for each column
                        }),
                    ),
                  }),
                  ...jsonData_procedures.actualProcedures.map(
                    (actualProcedures) =>
                      new TableRow({
                        children: COLUMNS.PROCEDURES.map((procedureColumn) => {
                          return new TableCell({
                            children: [
                              new Paragraph(
                                actualProcedures[procedureColumn.jsonKey]
                                  ? actualProcedures[
                                      procedureColumn.jsonKey
                                    ].toString()
                                  : procedureColumn.defaultValue.toString(),
                              ),
                            ],
                          });
                        }),
                      }),
                  ),
                ],
              }),
              new Paragraph({
                text: '', // Add an empty paragraph for spacing between tables
                spacing: {
                  after: 300, // Adjust spacing after the paragraph (example: 200 twips = 0.1 inch)
                },
              }),

              // 3rd Table(VITALS)

              new Paragraph({
                text: 'VITALS',
                heading: HeadingLevel.HEADING_1,
              }),
              new Table({
                width: {
                  size: 10000, // Width of the second table
                  type: WidthType.DXA,
                },
                rows: [
                  new TableRow({
                    children: jsonData_vitals.headers.map(
                      (header) =>
                        new TableCell({
                          children: [
                            new Paragraph({
                              text: header,
                              style: 'TableHeader',
                              shading: { fill: 'CCCCCC' },
                            }),
                          ],
                          width: { size: 3000, type: WidthType.DXA }, // Fixed width for each column
                        }),
                    ),
                  }),
                  ...jsonData_vitals.actualVitals.map(
                    (actualVitals) =>
                      new TableRow({
                        children: COLUMNS.VITALS.map((vitalsColumn) => {
                          return new TableCell({
                            children: [
                              new Paragraph(
                                // Check if the value exists in the direct properties of actualVitals
                                actualVitals[vitalsColumn.jsonKey]
                                  ? actualVitals[
                                      vitalsColumn.jsonKey
                                    ].toString()
                                  : // If not found, check in the nested valueQuantity
                                    actualVitals.valueQuantity &&
                                      actualVitals.valueQuantity[
                                        vitalsColumn.jsonKey
                                      ] !== undefined
                                    ? actualVitals.valueQuantity[
                                        vitalsColumn.jsonKey
                                      ].toString()
                                    : // Use the defaultValue if neither direct nor nested property exists
                                      vitalsColumn.defaultValue.toString(),
                              ),
                            ],
                          });
                        }),
                      }),
                  ),
                ],
              }),

              new Paragraph({
                text: '', // Add an empty paragraph for spacing between tables
                spacing: {
                  after: 300, // Adjust spacing after the paragraph (example: 200 twips = 0.1 inch)
                },
              }),
              // 4th Table
              new Paragraph({
                text: 'Medication Requests',
                heading: HeadingLevel.HEADING_1,
              }),
              new Table({
                width: {
                  size: 10000, // Width of the second table
                  type: WidthType.DXA,
                },
                rows: [
                  new TableRow({
                    children: jsonData_medications.headers.map(
                      (header) =>
                        new TableCell({
                          children: [
                            new Paragraph({
                              text: header,
                              style: 'TableHeader',
                              shading: { fill: 'CCCCCC' },
                            }),
                          ],
                          width: { size: 3000, type: WidthType.DXA }, // Fixed width for each column
                        }),
                    ),
                  }),
                  ...jsonData_medications.actualRequest.map(
                    (actualRequest) =>
                      new TableRow({
                        children: COLUMNS.MEDICATIONREQUESTS.map(
                          (reqColumn) => {
                            return new TableCell({
                              children: [
                                new Paragraph(
                                  // Check if the value exists in the direct properties of actualreq
                                  actualRequest[reqColumn.jsonKey]
                                    ? actualRequest[
                                        reqColumn.jsonKey
                                      ].toString()
                                    : // If not found, check in the nested valueQuantity
                                      actualRequest.dosageInstruction &&
                                        actualRequest.dosageInstruction[
                                          reqColumn.jsonKey
                                        ] !== undefined &&
                                        actualRequest.dosageInstruction[
                                          reqColumn.jsonKey
                                        ] !== null
                                      ? actualRequest.dosageInstruction[
                                          reqColumn.jsonKey
                                        ].toString()
                                      : // Use the defaultValue if neither direct nor nested property exists
                                        reqColumn.defaultValue.toString(),
                                ),
                              ],
                            });
                          },
                        ),
                      }),
                  ),
                ],
              }),

              new Paragraph({
                text: '', // Add an empty paragraph for spacing between tables
                spacing: {
                  after: 300, // Adjust spacing after the paragraph (example: 200 twips = 0.1 inch)
                },
              }),

              // 5th Table

              new Paragraph({
                text: 'Medication Statements',
                heading: HeadingLevel.HEADING_1,
              }),
              new Table({
                width: {
                  size: 10000, // Width of the second table
                  type: WidthType.DXA,
                },
                rows: [
                  new TableRow({
                    children: jsonData_conditions.headers.map(
                      (header) =>
                        new TableCell({
                          children: [
                            new Paragraph({
                              text: header,
                              style: 'TableHeader',
                              shading: { fill: 'CCCCCC' },
                            }),
                          ],
                          width: { size: 3000, type: WidthType.DXA }, // Fixed width for each column
                        }),
                    ),
                  }),
                  ...jsonData_statements.actualStatements.map(
                    (actualStatements) =>
                      new TableRow({
                        children: COLUMNS.STATEMENTS.map((statementColumn) => {
                          return new TableCell({
                            children: [
                              new Paragraph(
                                actualStatements[statementColumn.jsonKey]
                                  ? actualStatements[
                                      statementColumn.jsonKey
                                    ].toString()
                                  : statementColumn.defaultValue.toString(),
                              ),
                            ],
                          });
                        }),
                      }),
                  ),
                ],
              }),
            ],
          },
        ],
      });

      // Generate a buffer from the document
      const buffer = await Packer.toBuffer(doc);
      await fs.promises.writeFile(outputPath, buffer);
      return outputPath;
    } catch (error) {
      console.error('Error generating DOCX:', error);
      throw new Error('Failed to generate DOCX file');
    }
  }
}
