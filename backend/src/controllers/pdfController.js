const htmlPdf = require('html-pdf-node');

exports.generatePDF = async (req, res) => {
  try {
    const { html, filename = 'document.pdf' } = req.body;

    if (!html) {
      return res.status(400).json({ error: 'HTML content is required' });
    }

    const options = {
      format: 'A4',
      margin: { top: '10mm', right: '10mm', bottom: '10mm', left: '10mm' },
      printBackground: true,
    };

    const file = { content: html };
    const pdfBuffer = await htmlPdf.generatePdf(file, options);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.send(pdfBuffer);
  } catch (error) {
    console.error('PDF generation error:', error);
    res.status(500).json({ error: 'Failed to generate PDF' });
  }
};
