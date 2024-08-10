import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const handleletterofCompletion = async (user) => {
  // setloader(true);
  if (user) {
    const startDate = new Date(user.Start_Date);
    const nextMonthDate = new Date(
      startDate.getFullYear(),
      startDate.getMonth() + 1,
      startDate.getDate()
    );

    // Format next month's date in "YYYY-MM-DD" format
    const formattedNextMonthDate = nextMonthDate.toISOString().slice(0, 10);

    const offerLetterHTML = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Letter of Completion</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            line-height: 1.6;
          }
          .container {
            width: 210mm; /* A4 width */
            height: 297mm; /* A4 height */
            max-width: 100%;
            max-height: 100%;
            margin: 0 auto; /* Center horizontally */
            background-color: #fff;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            border-radius: 5px;
            box-sizing: border-box;
            overflow: hidden;
            
            display: flex;
            flex-direction: column;
            justify-content: center;
          }
          .header {
            margin-bottom: 20px;
            border-bottom: 2px solid #333;
            padding-bottom: 10px;
          }
          .logo {
            top: 20px;
            right: 20px;
            width: 100px;
            height: auto;
          }
          .content {
            margin-left: 3rem;
            
            display: flex;
            flex: 1; /* Allow content to take full height */
          }
          .sidebar {
            width: 3rem;
            background-image: linear-gradient(to bottom, #0dc4eb, #0c3fab);
          }
          .text-content {
            flex: 1;
            color: #333;
            position: relative;
            padding: 2rem;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }
          .background-overlay {
            position: absolute;
            top: -10rem;
            right: 0;
            bottom: 0;
            left: 0;
            background-image: url("/realogo2.png");
            opacity: 0.2;
          }
          .text-content .background-overlay {
            width: 100%;
            height: 100%;
            background-size: 350px;
            background-repeat: no-repeat;
            background-position: center;
          }
          .logo_heading {
            display: flex;
            justify-content: space-between;
          }
          .flex {
            display: flex;
          }
          .msme {
            display: flex;
            justify-content: flex-end;
          }
          .stamp {
            margin-left: 10vw;
          }
          .date {
            width: 100%;
            display: flex;
            justify-content: flex-end;
          }
          h1 {
            font-size: x-large;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="content">
            <div class="sidebar"></div>
            <div class="text-content">
              <div class="logo_heading">
                <img src="/realogo2.png" alt="Company Logo" class="logo" />
                <div class="empId">${user.student_id.toUpperCase()}</div>
              </div>
              
              <h1>To the Concerned Authority</h1>
              <div class="date">${formattedNextMonthDate}</div>
              <div class="background-overlay"></div>
              <p>
                This is to certify that ${
                  user.first_name +
                  " " +
                  (user.middle_name === "" ? "" : user.middle_name + " ") +
                  user.last_name
                }, a student of CSE at 
                ${
                  user.bachelor_college
                }, worked as an intern with CodeDynamos from
                ${user.Start_Date} to ${formattedNextMonthDate}.
              </p>
    
              <p>
                During this period, he held the position of 
                ${user.sector}<br /><br />
                ${
                  user.first_name +
                  " " +
                  (user.middle_name === "" ? "" : user.middle_name + " ") +
                  user.last_name
                } demonstrated a remarkable level of responsibility,
                sincerity, and a genuine willingness to learn and take on new
                assignments and challenges.
              </p>
              <p>
                In particular, his coordination skills and communication skills are
                excellent, and his attention to detail is impressive.
              </p>
              <br />
              <p>We wish him all the very best for his future endeavors.</p>
              
              <div class="flex">
                <div class="">
                  <img
                    src="/signature.png"
                    alt="signature"
                    width="150"
                    height="50"
                  />
                  <div class="flex">
                    <div class="">
                      <p>With regards,</p>
                      <p>CodeDynamos</p>
                    </div>
                    <div class="stamp">
                      <img
                        src="/stamp.png"
                        alt="signature"
                        width="100"
                        height="100"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="msme">
                <img
                  src="/msme.png"
                  alt="signature"
                  width="150"
                  height="100"
                />
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>`;

    const element = document.createElement("div");
    element.innerHTML = offerLetterHTML;
    document.body.appendChild(element);

    const container = element.querySelector(".container");

    await html2canvas(container, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      scrollY: -window.scrollY,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/jpeg", 0.7);
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210; // A4 width in mm
      const imgHeight = 297;
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("Letter_of_completion.pdf");
      document.body.removeChild(element);
      //   setloader(false);
    });
  }
};
