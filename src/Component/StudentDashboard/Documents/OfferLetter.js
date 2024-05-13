// // import { useEffect } from 'react'; // Import useEffect if you need it for any specific purpose
// import "tailwindcss/tailwind.css"; // Import Tailwind CSS
// import jsPDF from "jspdf";

// export default function InternshipOfferLetter() {
//   const pdf = new jsPDF();
// const htmlContent = `<html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Internship Offer Letter</title>
// </head>
// <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f5f5f5;">
//     <div class="container" style="width: 21cm; margin: 2cm auto; padding: 2cm; background-color: #ffffff; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
//         <div class="box" style="border: #333 solid 2px; overflow: hidden;">
//             <div class="logo" style="display: flex; justify-content: center;">
//                 <img src="../realogo2.png" height="200" alt="logo">
//             </div>
//             <header style="text-align: center; padding: 20px; background-color: #1668aa; color: #ffffff;">
//                 <h1>Internship Offer Letter</h1>
//             </header>
//             <div class="content" style="color: #333; padding: 20px; position: relative;">
//                 <div class="background-overlay" style="position: absolute; top: 0; right: 0; bottom: 0; left: 0; background-image: url('../frontend/public/realogo2.png'); opacity: 0.5; width: 100%; height: 100%; background-size: 500px; background-repeat: no-repeat; background-position: center;"></div>
//                 <!-- Overlay for background image opacity -->
//                 <p style="margin-bottom: 10px;">Date: 27/12/2022</p>
//                 <p style="margin-bottom: 10px;">Ayush Gupta</p>
//                 <p style="margin-bottom: 10px;">GL Bajaj Group of Institution</p>
//                 <br>
//                 <p style="margin-bottom: 10px;">Dear Ayush Gupta,</p>
//                 <p style="margin-bottom: 10px;">We are pleased to extend an internship offer to you at CodeDynamos!</p>
//                 <p style="margin-bottom: 10px;">Congratulations! We are delighted to offer you a position as a Web Development Intern.</p>
//                 <p style="margin-bottom: 10px;">Below are the terms and conditions of our offer:</p>
//                 <p style="margin-bottom: 10px;">Your internship is scheduled to commence on [Scheduled Date of Internship]. Upon acceptance of this offer, you will assume the role of an intern with CodeDynamos. Please note that as an intern, you will be classified as a temporary employee and will not be entitled to employee benefits provided to regular employees.</p>
//                 <p style="margin-bottom: 10px;">By accepting this offer, you agree to adhere to all company policies and practices, including those governing conduct, non-discrimination, and harassment prevention. This letter constitutes the entire agreement between you and CodeDynamos, superseding any prior discussions or agreements.</p>
//                 <p style="margin-bottom: 10px;">We trust that your internship experience with CodeDynamos will be both enriching and rewarding.</p>
//                 <br>
//                 <div class="flex" style="display: flex; justify-content: space-between; align-items: center;">
//                     <div style="">
//                         <img src="./code-dynamos-logo-zip-file/png/logo-black.png" alt="signature" width="100" height="100">
//                         <p style="margin-bottom: 10px;">Thank You</p>
//                         <p style="margin-bottom: 10px;">CodeDynamos</p>
//                     </div>
//                     <div style="">
//                         <img src="" alt="stamp">
//                     </div>
//                 </div>
//             </div>
//             <hr>
//             <div class="flex" style="display: flex; justify-content: space-between; align-items: center;">
//                 <div class="contact" style="text-align: center;">
//                     <p>Contact: abc@CodeDynamos.com</p>
//                     <p>Website: www.codeDynamos.com</p>
//                 </div>
//                 <div class="msme">
//                     <img src="./code-dynamos-logo-zip-file/png/logo-black.png" alt="msme" width="100" height="100">
//                 </div>
//             </div>
//         </div>
//     </div>
// </body>
// </html>`;

//   pdf.html(htmlContent, {
//     callback: () => {
//       pdf.save("offer_letter.pdf");
//     },
//   });
// }
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function InternshipOfferLetter() {
  const htmlContent = `<html lang="en">
  
  <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f5f5f5;">
      <div class="container" style="width: 21cm; padding: 2cm; background-color: #ffffff; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); font-size: 12px;">
          <div class="box" style="border: #333 solid 2px; overflow: hidden;">
              <div class="logo" style="display: flex; justify-content: center;">
                  <img src="../realogo2.png" height="200" alt="logo">
              </div>
              <header style="text-align: center; padding: 20px; background-color: #1668aa; color: #ffffff;">
                  <h1>Internship Offer Letter</h1>
              </header>
              <div class="content" style="color: #333; padding: 20px; position: relative;">
                  <div class="background-overlay" style="position: absolute; top: 0; right: 0; bottom: 0; left: 0; background-image: url('../frontend/public/realogo2.png'); opacity: 0.5; width: 100%; height: 100%; background-size: 500px; background-repeat: no-repeat; background-position: center;"></div>
                  <!-- Overlay for background image opacity -->
                  <p style="margin-bottom: 10px;">Date: 27/12/2022</p>
                  <p style="margin-bottom: 10px;">Ayush Gupta</p>
                  <p style="margin-bottom: 10px;">GL Bajaj Group of Institution</p>
                  <br>
                  <p style="margin-bottom: 10px;">Dear Ayush Gupta,</p>
                  <p style="margin-bottom: 10px;">We are pleased to extend an internship offer to you at CodeDynamos!</p>
                  <p style="margin-bottom: 10px;">Congratulations! We are delighted to offer you a position as a Web Development Intern.</p>
                  <p style="margin-bottom: 10px;">Below are the terms and conditions of our offer:</p>
                  <p style="margin-bottom: 10px;">Your internship is scheduled to commence on [Scheduled Date of Internship]. Upon acceptance of this offer, you will assume the role of an intern with CodeDynamos. Please note that as an intern, you will be classified as a temporary employee and will not be entitled to employee benefits provided to regular employees.</p>
                  <p style="margin-bottom: 10px;">By accepting this offer, you agree to adhere to all company policies and practices, including those governing conduct, non-discrimination, and harassment prevention. This letter constitutes the entire agreement between you and CodeDynamos, superseding any prior discussions or agreements.</p>
                  <p style="margin-bottom: 10px;">We trust that your internship experience with CodeDynamos will be both enriching and rewarding.</p>
                  <br>
                  <div class="flex" style="display: flex; justify-content: space-between; align-items: center;">
                      <div style="">
                          <img src="./code-dynamos-logo-zip-file/png/logo-black.png" alt="signature" width="100" height="100">
                          <p style="margin-bottom: 10px;">Thank You</p>
                          <p style="margin-bottom: 10px;">CodeDynamos</p>
                      </div>
                      <div style="">
                          <img src="" alt="stamp">
                      </div>
                  </div>
              </div>
              <hr>
              <div class="flex" style="display: flex; justify-content: space-between; align-items: center;">
                  <div class="contact" style="text-align: center;">
                      <p>Contact: abc@CodeDynamos.com</p>
                      <p>Website: www.codeDynamos.com</p>
                  </div>
                  <div class="msme">
                      <img src="./code-dynamos-logo-zip-file/png/logo-black.png" alt="msme" width="100" height="100">
                  </div>
              </div>
          </div>
      </div>
  </body>
  </html>`;

  const container = document.createElement("div");
  container.innerHTML = htmlContent;

  html2canvas(container, {
    useCORS: true,
    logging: true,
    scale: 2, // increase scale for better resolution
  }).then((canvas) => {
    const pdf = new jsPDF("p", "pt", "a4");
    const imgData = canvas.toDataURL("image/png");
    pdf.addImage(imgData, "PNG", 0, 0, 595, 842); // A4 dimensions: 595x842 points
    pdf.save("offer_letter.pdf");
  });
}
