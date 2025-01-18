import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'
import { LegalDocument } from './document-structure'

export async function generatePDF(document: LegalDocument): Promise<Blob> {
  // Create a new PDFDocument
  const pdfDoc = await PDFDocument.create()

  // Embed the standard fonts
  const timesRoman = await pdfDoc.embedFont(StandardFonts.TimesRoman)
  const timesBold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold)

  // Page settings
  const pageWidth = 612 // Letter size width in points (8.5 inches)
  const pageHeight = 792 // Letter size height in points (11 inches)
  const margin = 72 // 1-inch margins
  const contentWidth = pageWidth - margin * 2

  // Font settings
  const titleSize = 14
  const sectionTitleSize = 12
  const bodySize = 11

  // Spacing settings
  const lineHeight = bodySize * 1.5
  const paragraphSpacing = bodySize * 2
  const sectionSpacing = bodySize * 3
  const headerSpacing = bodySize * 4

  let currentPage = pdfDoc.addPage([pageWidth, pageHeight])
  let y = pageHeight - margin

  // Helper functions
  const addPage = () => {
    currentPage = pdfDoc.addPage([pageWidth, pageHeight])
    y = pageHeight - margin
    return currentPage
  }

  const needsNewPage = (height: number) => y - height < margin

  const writeText = (
    text: string,
    {
      size = bodySize,
      bold = false,
      centered = false,
      rightAligned = false,
      indent = 0,
      spacing = lineHeight,
    } = {},
  ) => {
    const font = bold ? timesBold : timesRoman
    const words = text.split(' ')
    let line = ''
    const xOffset = margin + indent

    for (const word of words) {
      const testLine = line ? `${line} ${word}` : word
      const width = font.widthOfTextAtSize(testLine, size)

      if (width > contentWidth - indent) {
        // Write current line
        if (needsNewPage(spacing)) addPage()

        const x = centered
          ? (pageWidth - font.widthOfTextAtSize(line, size)) / 2
          : rightAligned
            ? pageWidth - margin - font.widthOfTextAtSize(line, size)
            : xOffset

        currentPage.drawText(line, {
          x,
          y,
          size,
          font,
          color: rgb(0, 0, 0),
        })

        y -= spacing
        line = word
      } else {
        line = testLine
      }
    }

    // Write remaining text
    if (line) {
      if (needsNewPage(spacing)) addPage()

      const x = centered
        ? (pageWidth - font.widthOfTextAtSize(line, size)) / 2
        : rightAligned
          ? pageWidth - margin - font.widthOfTextAtSize(line, size)
          : xOffset

      currentPage.drawText(line, {
        x,
        y,
        size,
        font,
        color: rgb(0, 0, 0),
      })
      y -= spacing
    }

    return y
  }

  // Write document header
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  writeText(currentDate, { rightAligned: true, size: bodySize })
  y -= headerSpacing / 2

  writeText(document.metadata.title, {
    centered: true,
    bold: true,
    size: titleSize,
  })
  y -= headerSpacing

  // Write parties
  writeText(`Between:`, { bold: true })
  y -= lineHeight
  writeText(document.metadata.parties.firstParty.name, { indent: 20 })
  if (document.metadata.parties.firstParty.companyName) {
    writeText(document.metadata.parties.firstParty.companyName, { indent: 20 })
  }
  if (document.metadata.parties.firstParty.address) {
    writeText(document.metadata.parties.firstParty.address, { indent: 20 })
  }
  y -= lineHeight

  writeText(`And:`, { bold: true })
  y -= lineHeight
  writeText(document.metadata.parties.secondParty.name, { indent: 20 })
  if (document.metadata.parties.secondParty.companyName) {
    writeText(document.metadata.parties.secondParty.companyName, { indent: 20 })
  }
  if (document.metadata.parties.secondParty.address) {
    writeText(document.metadata.parties.secondParty.address, { indent: 20 })
  }
  y -= sectionSpacing

  // Write recitals
  writeText('RECITALS:', { bold: true, size: sectionTitleSize })
  y -= paragraphSpacing

  for (const whereas of document.recitals.whereas) {
    writeText('WHEREAS, ' + whereas)
    y -= lineHeight
  }
  y -= paragraphSpacing

  writeText(document.recitals.agreement)
  y -= sectionSpacing

  // Write main sections
  document.sections.forEach((section, index) => {
    if (needsNewPage(sectionSpacing * 2)) addPage()

    writeText(`${index + 1}. ${section.title}`, {
      bold: true,
      size: sectionTitleSize,
    })
    y -= paragraphSpacing

    section.content.forEach((paragraph) => {
      writeText(paragraph)
      y -= lineHeight
    })

    if (section.subsections) {
      y -= paragraphSpacing
      section.subsections.forEach((subsection) => {
        writeText(subsection.title, { bold: true, indent: 20 })
        y -= lineHeight
        subsection.content.forEach((paragraph) => {
          writeText(paragraph, { indent: 40 })
          y -= lineHeight
        })
      })
    }

    y -= sectionSpacing
  })

  // Write signature page
  addPage()
  y = pageHeight - margin

  writeText(
    'IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first above written.',
    { bold: true },
  )
  y -= sectionSpacing

  // First Party signature
  writeText(document.metadata.parties.firstParty.name + ':', { bold: true })
  y -= sectionSpacing
  writeText('Signature: _______________________')
  y -= lineHeight * 2
  writeText('Name: ' + document.signatures.firstParty.name)
  y -= lineHeight * 2
  if (document.signatures.firstParty.title) {
    writeText('Title: ' + document.signatures.firstParty.title)
    y -= lineHeight * 2
  }
  writeText('Date: ' + currentDate)
  y -= sectionSpacing * 1.5

  // Second Party signature
  writeText(document.metadata.parties.secondParty.name + ':', { bold: true })
  y -= sectionSpacing
  writeText('Signature: _______________________')
  y -= lineHeight * 2
  writeText('Name: ' + document.signatures.secondParty.name)
  y -= lineHeight * 2
  if (document.signatures.secondParty.title) {
    writeText('Title: ' + document.signatures.secondParty.title)
    y -= lineHeight * 2
  }
  writeText('Date: ' + currentDate)

  const pdfBytes = await pdfDoc.save()
  return new Blob([pdfBytes], { type: 'application/pdf' })
}
