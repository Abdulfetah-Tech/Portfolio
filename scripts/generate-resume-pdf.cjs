const fs = require('fs');
const path = require('path');

// Generates a clean, standard 1-page PDF vector document matching Abdulfetah Sultan Bedru's resume
function generateResumePdf() {
  const content = [];
  
  // Helper for adding PDF text commands
  // Standard letter size: 612 x 792 pt
  // Origin (0,0) is bottom-left, top is 792
  
  const stream = `
BT
/F2 18 Tf
205 745 Td
(ABDULFETAH SULTAN BEDRU) Tj
ET

BT
/F1 11 Tf
235 730 Td
(Full-Stack Software Engineer) Tj
ET

BT
/F1 8 Tf
65 712 Td
(abdulfetahsultanbedru7@gmail.com   |   0940579561   |   Addis Ababa, Ethiopia) Tj
ET

BT
/F1 8 Tf
95 700 Td
(portfolio-kappa-gray-75.vercel.app   |   linkedin.com/in/abdulfetah-sultan-99212227a) Tj
ET

BT
/F1 8 Tf
155 688 Td
(github.com/Abdulfetah-Tech   |   leetcode.com/u/Abdulfetah_Sultan) Tj
ET

% Horizontal divider
0.7 w
0.2 0.2 0.2 RG
50 678 m
562 678 l
S

% Section: Professional Summary
BT
/F2 10 Tf
50 663 Td
(PROFESSIONAL SUMMARY) Tj
ET

BT
/F1 8.5 Tf
12 TL
50 648 Td
(I am a software engineer passionate about building practical, scalable, and maintainable software. My) Tj T*
(development experience spans backend engineering, RESTful APIs, databases, frontend development, mobile) Tj T*
(application development, authentication, security, testing, and full-stack application architecture.) Tj
ET

0.5 w
50 615 m
562 615 l
S

% Section: Professional Experience
BT
/F2 10 Tf
50 600 Td
(PROFESSIONAL EXPERIENCE) Tj
ET

BT
/F2 9 Tf
50 585 Td
(Software Developer) Tj
ET

BT
/F1 8.5 Tf
470 585 Td
(08/2020 - 10/2025) Tj
ET

BT
/F3 8.5 Tf
50 573 Td
(Sheger system) Tj
ET

BT
/F1 8 Tf
470 573 Td
(Addis Ababa) Tj
ET

BT
/F2 9 Tf
50 555 Td
(Web Developer) Tj
ET

BT
/F1 8.5 Tf
470 555 Td
(08/2023 - 11/2023) Tj
ET

BT
/F3 8.5 Tf
50 543 Td
(NEO AI Technologies) Tj
ET

BT
/F1 8 Tf
470 543 Td
(Addis Ababa) Tj
ET

0.5 w
50 530 m
562 530 l
S

% Section: Education & Training
BT
/F2 10 Tf
50 515 Td
(EDUCATION & TRAINING) Tj
ET

BT
/F2 8.5 Tf
50 500 Td
(Bachelor of Science - BSc, Computer Science and Engineering) Tj
ET

BT
/F1 8 Tf
470 500 Td
(06/2020 - 06/2025) Tj
ET

BT
/F3 8.5 Tf
50 488 Td
(Adama Science and Technology University) Tj
ET

BT
/F2 8.5 Tf
50 472 Td
(Advanced Digital Skill Training in Full-Stack Software Development) Tj
ET

BT
/F1 8 Tf
470 472 Td
(01/2026 - Present) Tj
ET

BT
/F3 8.5 Tf
50 460 Td
(Addis Ababa University) Tj
ET

0.5 w
50 448 m
562 448 l
S

% Section: Technical Skills
BT
/F2 10 Tf
50 433 Td
(TECHNICAL SKILLS) Tj
ET

% Column 1
BT
/F2 8.5 Tf
50 418 Td
(Frontend Development) Tj
ET

BT
/F1 8 Tf
10.5 TL
50 406 Td
(HTML5, CSS3, JavaScript, Angular, React, UI/UX) Tj T*
(Implementation, Responsive Design) Tj
ET

BT
/F2 8.5 Tf
50 378 Td
(Architecture & Infrastructure) Tj
ET

BT
/F1 8 Tf
10.5 TL
50 366 Td
(API Development, Notification Integrations) Tj T*
(\(SMS/Delegate Patterns\), Event-Driven Architecture) Tj
ET

% Column 2
BT
/F2 8.5 Tf
310 418 Td
(Backend & Software Systems) Tj
ET

BT
/F1 8 Tf
10.5 TL
310 406 Td
(C#, .NET SDK, Scala, Functional Programming, psql) Tj T*
(\(PostgreSQL\), Asynchronous Programming) Tj
ET

BT
/F2 8.5 Tf
310 378 Td
(Tools & Development Ecosystem) Tj
ET

BT
/F1 8 Tf
10.5 TL
310 366 Td
(Linux Terminal, Git/GitHub, VS Code, Environment) Tj T*
(Provisioning) Tj
ET

0.5 w
50 340 m
562 340 l
S

% Section: Key Projects
BT
/F2 10 Tf
50 325 Td
(KEY PROJECTS) Tj
ET

BT
/F2 9 Tf
50 310 Td
(Training Management System \(TMS\) Backend Suite) Tj
ET

BT
/F1 8 Tf
10.5 TL
55 297 Td
(\\(bullet\\) Designed and deployed enrollment logic integrating delegate-driven software layers for cross-module) Tj T*
(   synchronization and multi-tier student data orchestration.) Tj T*
(\\(bullet\\) Implemented an event-driven notification component implementing the C# Delegate pattern to decouple) Tj T*
(   SMS/system messaging flows from primary transactional databases.) Tj
ET

BT
/F2 9 Tf
50 250 Td
(OneGov-Unified E-Government Service Platform) Tj
ET

BT
/F3 8 Tf
50 239 Td
(Full-Stack Developer) Tj
ET

BT
/F1 8 Tf
10.5 TL
55 227 Td
(\\(bullet\\) Contributed to a national digital platform integrating government services into a single portal, enhancing) Tj T*
(   efficiency, transparency, and citizen access through secure digital identity and streamlined workflows.) Tj
ET

BT
/F2 9 Tf
50 198 Td
(Fetan Digital Platform for Home Renovation and Maintenance Expert) Tj
ET

BT
/F3 8 Tf
50 187 Td
(Frontend Developer and Data base Integration) Tj
ET

BT
/F1 8 Tf
10.5 TL
55 175 Td
(\\(bullet\\) As a frontend developer, I successfully integrated dynamic user interfaces with backend databases, ensuring) Tj T*
(   seamless data flow and enhancing user experience. My contributions included optimizing performance,) Tj T*
(   implementing responsive designs, and utilizing APIs for efficient data retrieval and manipulation. This) Tj T*
(   resulted in improved application responsiveness and user satisfaction.) Tj
ET
`;

  const streamBytes = Buffer.from(stream.trim(), 'utf-8');

  const pdf = `%PDF-1.4
1 0 obj
<<
  /Type /Catalog
  /Pages 2 0 R
>>
endobj
2 0 obj
<<
  /Type /Pages
  /Kids [3 0 R]
  /Count 1
>>
endobj
3 0 obj
<<
  /Type /Page
  /Parent 2 0 R
  /MediaBox [0 0 612 792]
  /Contents 4 0 R
  /Resources <<
    /Font <<
      /F1 5 0 R
      /F2 6 0 R
      /F3 7 0 R
    >>
  >>
>>
endobj
4 0 obj
<<
  /Length ${streamBytes.length}
>>
stream
${stream.trim()}
endstream
endobj
5 0 obj
<<
  /Type /Font
  /Subtype /Type1
  /BaseFont /Helvetica
>>
endobj
6 0 obj
<<
  /Type /Font
  /Subtype /Type1
  /BaseFont /Helvetica-Bold
>>
endobj
7 0 obj
<<
  /Type /Font
  /Subtype /Type1
  /BaseFont /Helvetica-Oblique
>>
endobj
xref
0 8
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000287 00000 n 
0000000350 00000 n 
0000000421 00000 n 
0000000497 00000 n 
trailer
<<
  /Size 8
  /Root 1 0 R
>>
startxref
577
%%EOF
`;

  const outPath1 = path.join(__dirname, '../public/Abdulfetah-Bedru-CV.pdf');
  const outPath2 = path.join(__dirname, '../public/Abdulfetah-Sultan-Bedru-Resume.pdf');
  
  fs.writeFileSync(outPath1, pdf, 'utf-8');
  fs.writeFileSync(outPath2, pdf, 'utf-8');
  console.log(`Generated resume PDF at ${outPath1} and ${outPath2}`);
}

generateResumePdf();
