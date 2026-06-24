const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { marked } = require('marked');

// PATHS
const CHROME_PATH = '"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"';
const DOCS_DIR = path.join(__dirname, 'docs');
const OUTPUT_DIR = path.join(__dirname, 'pdf_exports');

// CREATE OUTPUT DIRECTORY
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR);
}

// PREMIUM PDF STYLING TEMPLATE
const getHtmlTemplate = (title, content) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${title}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;500;600;700&display=swap');
    
    body {
      font-family: 'Inter', sans-serif;
      color: #1e293b;
      line-height: 1.6;
      font-size: 11.5pt;
      margin: 0;
      padding: 30px;
      background: #ffffff;
    }
    
    h1, h2, h3, h4, h5, h6 {
      font-family: 'Outfit', sans-serif;
      color: #0f172a;
      font-weight: 600;
      margin-top: 24px;
      margin-bottom: 12px;
    }
    
    h1 {
      font-size: 26pt;
      border-bottom: 2px solid #6366f1;
      padding-bottom: 10px;
      margin-bottom: 30px;
    }
    
    h2 {
      font-size: 18pt;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 6px;
      margin-top: 36px;
    }
    
    h3 {
      font-size: 14pt;
      color: #4f46e5;
    }
    
    p {
      margin-bottom: 16px;
      text-align: justify;
    }
    
    ul, ol {
      margin-bottom: 16px;
      padding-left: 24px;
    }
    
    li {
      margin-bottom: 6px;
    }
    
    code {
      font-family: Consolas, Monaco, 'Andale Mono', monospace;
      background: #f1f5f9;
      color: #0f172a;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 9.5pt;
    }
    
    pre {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      padding: 16px;
      border-radius: 8px;
      overflow-x: auto;
      margin: 20px 0;
    }
    
    pre code {
      background: transparent;
      padding: 0;
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 24px 0;
      font-size: 10pt;
    }
    
    th, td {
      border: 1px solid #cbd5e1;
      padding: 10px 14px;
      text-align: left;
    }
    
    th {
      background-color: #f1f5f9;
      font-weight: 600;
      color: #334155;
    }
    
    tr:nth-child(even) {
      background-color: #f8fafc;
    }
    
    blockquote {
      border-left: 4px solid #6366f1;
      background: #f8fafc;
      padding: 12px 20px;
      margin: 20px 0;
      color: #475569;
      border-radius: 0 8px 8px 0;
    }
    
    /* Cover Page Styling */
    .cover-page {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 90vh;
      page-break-after: always;
      padding: 40px;
    }
    
    .cover-title {
      font-size: 34pt;
      font-weight: 700;
      line-height: 1.2;
      margin-bottom: 12px;
      color: #0f172a;
    }
    
    .cover-subtitle {
      font-size: 18pt;
      color: #4f46e5;
      margin-bottom: 80px;
    }
    
    .cover-meta {
      margin-top: auto;
      border-top: 1px solid #e2e8f0;
      padding-top: 20px;
      font-size: 11pt;
      color: #64748b;
    }
    
    /* Page break helpers */
    .page-break {
      page-break-before: always;
    }
    
    /* Carousel removal in print */
    .carousel-slide {
      margin-bottom: 30px;
    }
    .carousel-slide img {
      max-width: 100%;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
    }
  </style>
</head>
<body>
  ${content}
</body>
</html>
`;

// RENDER MARKDOWN TO PDF USING CHROME
function convertMarkdownToPdf(mdFilePath, outputPdfName, docTitle, isWalkthrough = false) {
  try {
    let mdContent = fs.readFileSync(mdFilePath, 'utf8');
    
    // Custom preprocess for image carousels in markdown
    if (isWalkthrough) {
      // Replace carousel container syntax with raw images for printing
      mdContent = mdContent.replace(/````carousel([\s\S]*?)````/g, (match, p1) => {
        return p1
          .split('<!-- slide -->')
          .map(slide => `<div class="carousel-slide">${marked.parse(slide.trim())}</div>`)
          .join('\n');
      });
    }

    const htmlContent = marked.parse(mdContent);
    const wrappedHtml = getHtmlTemplate(docTitle, htmlContent);
    
    const tempHtmlPath = path.join(path.dirname(mdFilePath), 'temp.html');
    fs.writeFileSync(tempHtmlPath, wrappedHtml, 'utf8');
    
    const pdfPath = path.join(OUTPUT_DIR, outputPdfName);
    const command = `${CHROME_PATH} --headless --disable-gpu --run-all-compositor-stages-before-draw --print-to-pdf="${pdfPath}" "${tempHtmlPath}"`;
    
    execSync(command);
    
    // Clean up temp file
    if (fs.existsSync(tempHtmlPath)) {
      fs.unlinkSync(tempHtmlPath);
    }
    
    console.log(`Successfully generated: ${outputPdfName}`);
  } catch (error) {
    console.error(`Error generating ${outputPdfName}:`, error.message);
  }
}

// 1. CONVERT DOCS FILES
const docsFiles = [
  { file: 'architecture_diagram.md', pdf: '1_Architecture_Diagram.pdf', title: 'System Architecture Blueprint' },
  { file: 'database_schema.md', pdf: '2_Database_Schema.pdf', title: 'Database Schema Blueprint' },
  { file: 'api_documentation.md', pdf: '3_API_Documentation.pdf', title: 'REST API Specification' },
  { file: 'user_roles.md', pdf: '4_User_Roles.pdf', title: 'User Roles & Permissions Matrix' },
  { file: 'wireframes.md', pdf: '5_Wireframes_Spec.pdf', title: 'UI Wireframe Specifications' },
];

docsFiles.forEach(d => {
  const mdPath = path.join(DOCS_DIR, d.file);
  if (fs.existsSync(mdPath)) {
    convertMarkdownToPdf(mdPath, d.pdf, d.title);
  }
});

// 2. CONVERT WALKTHROUGH FILE
const walkthroughPath = 'C:\\Users\\shani\\.gemini\\antigravity-ide\\brain\\467102fb-9268-4890-930f-734098b77c77\\walkthrough.md';
if (fs.existsSync(walkthroughPath)) {
  convertMarkdownToPdf(walkthroughPath, '0_Project_Walkthrough.pdf', 'Project Walkthrough & Design Report', true);
}

console.log('All PDF files compiled successfully in pdf_exports/ folder.');
