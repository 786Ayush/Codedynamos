// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";

// export const Offerletterr = () => {
//   const tempDiv = document.createElement("div");
// tempDiv.innerHTML = `
//   <body>
//   <style>
//       body {
//         font-family: Arial, sans-serif;
//         margin: 0;
//         padding: 0;
//         background-color: #f5f5f5;
//       }

//       .container {
//         width: 21cm;
//         height: 29.7cm;
//         margin: auto;
//         padding: 1cm;
//         background-color: #ffffff;
//         box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//       }

//       header {
//         text-align: center;
//         padding: 20px;
//         background-color: #1668aa;
//         color: #ffffff;
//       }

//       .content {
//         color: #333;
//         padding: 20px;
//         position: relative; /* Ensure proper positioning context for absolute elements */
//       }

//       .background-overlay {
//         position: absolute;
//         top: 0;
//         right: 0;
//         bottom: 0;
//         left: 0;
//         background-image: url("../frontend/public/realogo2.png");
//         opacity: 0.5; /* Adjust the opacity of the background image */
//       }

//       /* Apply the background overlay only to the .content div */
//       .content .background-overlay {
//         /* Set the size of the background overlay to match the content */
//         width: 100%;
//         height: 100%;
//         background-size: 500px; /* Adjust the background size if necessary */
//         background-repeat: no-repeat; /* Ensure the background image doesn't repeat */
//         background-position: center; /* Center the background image */
//       }
//       .box {
//         border: #333 solid 2px;
//         overflow: hidden;
//       }

//       .signature {
//         text-align: center;
//         margin-top: 30px;
//       }

//       .signature img {
//         width: 150px;
//       }

//       p {
//         margin-bottom: 10px;
//       }

//       h1 {
//         margin-top: 0;
//       }

//       .flex {
//         display: flex;
//         justify-content: space-between;
//         align-items: center;
//       }
//       .logo {
//         display: flex;
//         justify-content: center;
//       }
//       .contact,
//       .msme {
//         text-align: center;
//       }
//     </style>
//     <div class="container">
//       <div class="box">
//         <div class="logo">
//           <img src="../frontend/public/realogo2.png" height="200" alt="" />
//         </div>

//         <header>
//           <h1>Internship Offer Letter</h1>
//         </header>

//         <div class="content">
//           <div class="background-overlay"></div>
//           <!-- Overlay for background image opacity -->
//           <p>Date: 27/12/2022</p>
//           <p>Ayush Gupta</p>
//           <p>GL Bajaj Group of Institution</p>
//           <br />
//           <p>Dear Ayush Gupta,</p>
//           <p>
//             We are pleased to extend an internship offer to you at CodeDynamos!
//           </p>
//           <p>
//             Congratulations! We are delighted to offer you a position as a Web
//             Development Intern.
//           </p>
//           <p>Below are the terms and conditions of our offer:</p>
//           <p>
//             Your internship is scheduled to commence on [Scheduled Date of
//             Internship]. Upon acceptance of this offer, you will assume the role
//             of an intern with CodeDynamos. Please note that as an intern, you
//             will be classified as a temporary employee and will not be entitled
//             to employee benefits provided to regular employees.
//           </p>
//           <p>
//             By accepting this offer, you agree to adhere to all company policies
//             and practices, including those governing conduct,
//             non-discrimination, and harassment prevention. This letter
//             constitutes the entire agreement between you and CodeDynamos,
//             superseding any prior discussions or agreements.
//           </p>
//           <p>
//             We trust that your internship experience with CodeDynamos will be
//             both enriching and rewarding.
//           </p>
//           <br />
//           <div class="flex">
//             <div class="">
//               <img
//                 src="./code-dynamos-logo-zip-file/png/logo-black.png"
//                 alt="signature"
//                 width="100"
//                 height="100"
//               />
//               <p>Thank You</p>
//               <p>CodeDynamos</p>
//             </div>
//             <div class="">
//               <img src="" alt="stamp" />
//             </div>
//           </div>
//         </div>

//         <hr />
//         <div class="flex">
//           <div class="contact">
//             <p>Contact: abc@CodeDynamos.com</p>
//             <p>Website: www.codeDynamos.com</p>
//           </div>
//           <div class="msme">
//             <img
//               src="./code-dynamos-logo-zip-file/png/logo-black.png"
//               alt="msme"
//               width="100"
//               height="100"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//     <!-- <button onclick="downloadPDF()">download</button> -->
//     <!-- Include the jsPDF library -->
//     <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.3/jspdf.min.js"></script>
//     <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
//     <script>

//     </script>
//   </body>
// `;
//   const pdf = new jsPDF();
//   html2canvas(tempDiv, {
//     allowTaint: true,
//     useCORS: true,
//     removeContainer: true,
//     logging: false,
//     iframeAllow: "none", // Disable handling of iframes
//   }).then((canvas) => {
//     const imgData = canvas.toDataURL("image/png");
//     const imgWidth = 210; // Set the width to 210mm for A4 size
//     const pageHeight = 297; // Set the height to 297mm for A4 size
//     const imgHeight = (canvas.height * imgWidth) / canvas.width;
//     let heightLeft = imgHeight;
//     let position = 0;

//     pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
//     heightLeft -= pageHeight;

//     while (heightLeft >= 0) {
//       position = heightLeft - imgHeight;
//       pdf.addPage();
//       pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
//       heightLeft -= pageHeight;
//     }

//     pdf.save("offer_letter.pdf");
//   });
// };

import jsPDF from "jspdf";

export const Offerletterr = () => {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = `
    <body>
    <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f5f5f5;
        }
  
        .container {
          width: 21cm;
          height: 29.7cm;
          margin: auto;
          padding: 1cm;
          background-color: #ffffff;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
  
        header {
          text-align: center;
          padding: 20px;
          background-color: #1668aa;
          color: #ffffff;
        }
  
        .content {
          color: #333;
          padding: 20px;
          position: relative; /* Ensure proper positioning context for absolute elements */
        }
  
        .background-overlay {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          background-image: url("../frontend/public/realogo2.png");
          opacity: 0.5; /* Adjust the opacity of the background image */
        }
  
        /* Apply the background overlay only to the .content div */
        .content .background-overlay {
          /* Set the size of the background overlay to match the content */
          width: 100%;
          height: 100%;
          background-size: 500px; /* Adjust the background size if necessary */
          background-repeat: no-repeat; /* Ensure the background image doesn't repeat */
          background-position: center; /* Center the background image */
        }
        .box {
          border: #333 solid 2px;
          overflow: hidden;
        }
  
        .signature {
          text-align: center;
          margin-top: 30px;
        }
  
        .signature img {
          width: 150px;
        }
  
        p {
          margin-bottom: 10px;
        }
  
        h1 {
          margin-top: 0;
        }
  
        .flex {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .logo {
          display: flex;
          justify-content: center;
        }
        .contact,
        .msme {
          text-align: center;
        }
      </style>
      <div class="container">
        <div class="box">
          <div class="logo">
            <img src="../frontend/public/realogo2.png" height="200" alt="" />
          </div>
  
          <header>
            <h1>Internship Offer Letter</h1>
          </header>
  
          <div class="content">
            <div class="background-overlay"></div>
            <!-- Overlay for background image opacity -->
            <p>Date: 27/12/2022</p>
            <p>Ayush Gupta</p>
            <p>GL Bajaj Group of Institution</p>
            <br />
            <p>Dear Ayush Gupta,</p>
            <p>
              We are pleased to extend an internship offer to you at CodeDynamos!
            </p>
            <p>
              Congratulations! We are delighted to offer you a position as a Web
              Development Intern.
            </p>
            <p>Below are the terms and conditions of our offer:</p>
            <p>
              Your internship is scheduled to commence on [Scheduled Date of
              Internship]. Upon acceptance of this offer, you will assume the role
              of an intern with CodeDynamos. Please note that as an intern, you
              will be classified as a temporary employee and will not be entitled
              to employee benefits provided to regular employees.
            </p>
            <p>
              By accepting this offer, you agree to adhere to all company policies
              and practices, including those governing conduct,
              non-discrimination, and harassment prevention. This letter
              constitutes the entire agreement between you and CodeDynamos,
              superseding any prior discussions or agreements.
            </p>
            <p>
              We trust that your internship experience with CodeDynamos will be
              both enriching and rewarding.
            </p>
            <br />
            <div class="flex">
              <div class="">
                <img
                  src="./code-dynamos-logo-zip-file/png/logo-black.png"
                  alt="signature"
                  width="100"
                  height="100"
                />
                <p>Thank You</p>
                <p>CodeDynamos</p>
              </div>
              <div class="">
                <img src="" alt="stamp" />
              </div>
            </div>
          </div>
  
          <hr />
          <div class="flex">
            <div class="contact">
              <p>Contact: abc@CodeDynamos.com</p>
              <p>Website: www.codeDynamos.com</p>
            </div>
            <div class="msme">
              <img
                src="./code-dynamos-logo-zip-file/png/logo-black.png"
                alt="msme"
                width="100"
                height="100"
              />
            </div>
          </div>
        </div>
      </div>
      <!-- <button onclick="downloadPDF()">download</button> -->
      <!-- Include the jsPDF library -->
      <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.3/jspdf.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
      <script>
        
      </script>
    </body>
  `;

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const htmlDataUri = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
    tempDiv.outerHTML
  )}`;

  pdf.addSVGAsFile(htmlDataUri, 0, 0);
  pdf.save("offer_letter.pdf");
};
