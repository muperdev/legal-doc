import { Document, Paragraph, TextRun, HeadingLevel, Packer, AlignmentType } from 'docx'
import { LegalDocument } from '../pdf/document-structure'

export async function generateWord(document: LegalDocument): Promise<Blob> {
  try {
    const currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })

    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            // Title
            new Paragraph({
              children: [
                new TextRun({
                  text: document.metadata.title,
                  bold: true,
                  size: 32, // ~16pt
                }),
              ],
              heading: HeadingLevel.HEADING_1,
              alignment: AlignmentType.CENTER,
              spacing: { after: 400 },
            }),

            // Date
            new Paragraph({
              children: [
                new TextRun({
                  text: currentDate,
                  italics: true,
                }),
              ],
              alignment: AlignmentType.RIGHT,
              spacing: { after: 400 },
            }),

            // Parties
            new Paragraph({
              children: [
                new TextRun({
                  text: 'Between:',
                  bold: true,
                }),
              ],
              spacing: { after: 200 },
            }),
            new Paragraph({
              children: [
                new TextRun(document.metadata.parties.firstParty.name),
                ...(document.metadata.parties.firstParty.companyName
                  ? [new TextRun({ text: '\n' + document.metadata.parties.firstParty.companyName })]
                  : []),
                ...(document.metadata.parties.firstParty.address
                  ? [new TextRun({ text: '\n' + document.metadata.parties.firstParty.address })]
                  : []),
              ],
              indent: { left: 720 }, // 0.5 inch indent (720 twips)
              spacing: { after: 200 },
            }),

            new Paragraph({
              children: [
                new TextRun({
                  text: 'And:',
                  bold: true,
                }),
              ],
              spacing: { after: 200 },
            }),
            new Paragraph({
              children: [
                new TextRun(document.metadata.parties.secondParty.name),
                ...(document.metadata.parties.secondParty.companyName
                  ? [
                      new TextRun({
                        text: '\n' + document.metadata.parties.secondParty.companyName,
                      }),
                    ]
                  : []),
                ...(document.metadata.parties.secondParty.address
                  ? [new TextRun({ text: '\n' + document.metadata.parties.secondParty.address })]
                  : []),
              ],
              indent: { left: 720 },
              spacing: { after: 400 },
            }),

            // Recitals
            new Paragraph({
              children: [
                new TextRun({
                  text: 'RECITALS:',
                  bold: true,
                  size: 28, // ~14pt
                }),
              ],
              spacing: { after: 200 },
            }),
            ...document.recitals.whereas.map(
              (whereas) =>
                new Paragraph({
                  text: 'WHEREAS, ' + whereas,
                  spacing: { after: 200 },
                }),
            ),
            new Paragraph({
              text: document.recitals.agreement,
              spacing: { after: 400 },
            }),

            // Sections
            ...document.sections.flatMap((section, index) => [
              new Paragraph({
                children: [
                  new TextRun({
                    text: `${index + 1}. ${section.title}`,
                    bold: true,
                    size: 28, // ~14pt
                  }),
                ],
                spacing: { before: 400, after: 200 },
              }),
              ...section.content.map(
                (content) =>
                  new Paragraph({
                    text: content,
                    spacing: { after: 200 },
                  }),
              ),
              ...(section.subsections?.flatMap((subsection) => [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: subsection.title,
                      bold: true,
                    }),
                  ],
                  indent: { left: 720 },
                  spacing: { after: 200 },
                }),
                ...subsection.content.map(
                  (content) =>
                    new Paragraph({
                      text: content,
                      indent: { left: 1440 }, // 1 inch indent
                      spacing: { after: 200 },
                    }),
                ),
              ]) ?? []),
            ]),

            // Signature Block
            new Paragraph({
              children: [
                new TextRun({
                  text: 'IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first above written.',
                  bold: true,
                }),
              ],
              spacing: { before: 400, after: 400 },
            }),

            // First Party Signature
            new Paragraph({
              children: [
                new TextRun({
                  text: document.metadata.parties.firstParty.name + ':',
                  bold: true,
                }),
              ],
              spacing: { after: 400 },
            }),
            new Paragraph({
              text: '________________',
              spacing: { after: 200 },
            }),
            new Paragraph({
              text: 'Name: ' + document.signatures.firstParty.name,
              spacing: { after: 200 },
            }),
            ...(document.signatures.firstParty.title
              ? [
                  new Paragraph({
                    text: 'Title: ' + document.signatures.firstParty.title,
                    spacing: { after: 200 },
                  }),
                ]
              : []),
            new Paragraph({
              text: 'Date: ' + document.signatures.firstParty.date,
              spacing: { after: 400 },
            }),

            // Second Party Signature
            new Paragraph({
              children: [
                new TextRun({
                  text: document.metadata.parties.secondParty.name + ':',
                  bold: true,
                }),
              ],
              spacing: { after: 400 },
            }),
            new Paragraph({
              text: '________________',
              spacing: { after: 200 },
            }),
            new Paragraph({
              text: 'Name: ' + document.signatures.secondParty.name,
              spacing: { after: 200 },
            }),
            ...(document.signatures.secondParty.title
              ? [
                  new Paragraph({
                    text: 'Title: ' + document.signatures.secondParty.title,
                    spacing: { after: 200 },
                  }),
                ]
              : []),
            new Paragraph({
              text: 'Date: ' + document.signatures.secondParty.date,
              spacing: { after: 200 },
            }),
          ],
        },
      ],
    })

    return await Packer.toBlob(doc)
  } catch (error) {
    console.error('Error generating Word document:', error)
    throw error
  }
}
