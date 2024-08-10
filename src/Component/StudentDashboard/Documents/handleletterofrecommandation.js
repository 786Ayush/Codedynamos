import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const handleletterofRecommandation = async (user) => {
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
    <title>Letter of Recommendation</title>
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
        top: -7rem;
        right: 0;
        bottom: 0;
        left: 0;
        background-image: url("/realogo2.png");
        opacity: 0.2;
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
        margin-bottom: 1rem;
      }
      hr {
        width: 100%;
        height: 1px;
        background: #0c3fab;
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
            <img
              src="/realogo2.png"
              alt="Company Logo"
              class="logo"
              width="100"
              height="100"
            />
            <!-- Replace with your logo path -->
            <div class="empId">${user.student_id.toUpperCase()}</div>
          </div>
          <div>
          <div class="date">${formattedNextMonthDate}</div>
          <hr />
          </div>
          <div class="background-overlay"></div>

          <p>
            It is a great pleasure that we recommend ${
              user.first_name +
              " " +
              (user.middle_name ? user.middle_name + " " : "") +
              user.last_name
            }
            on the basis of his performance in the internship with CodeDynamos
            as Web Development Intern in the month of ${user.Start_Date} .He
            did an excellent job in this position and was an asset to our
            organization during his internship tenure.<br /><br />
            Throughout the internship, He has demonstrated excellent
            communication skills, a curious mind, and admirable social
            awareness. He also performed extremely well during the internship
            and showed excellent skills as seen in the project submission and
            participation in the regular activities.<br /><br />
            He is always willing to put a unique approach to the projects that
            are assigned, while also adhering to the guidelines and rules.<br /><br />
            With this, we will take this opportunity to wish ${
              user.first_name +
              " " +
              (user.middle_name ? user.middle_name + " " : "") +
              user.last_name
            } ,all luck for future endeavors and hope for a
            bright future ahead.
          </p>

          <div class="flex">
            <div>
              <img
                src="/signature.png"
                alt="Signature"
                width="150"
                height="50"
              />
              <!-- Replace with your signature path -->
              <div class="flex">
                <div>
                  <p>With regards,</p>
                  <p>CodeDynamos</p>
                </div>
                <div class="stamp">
                  <img
                    src="/stamp.png"
                    alt="Stamp"
                    width="100"
                    height="100"
                  />
                  <!-- Replace with your stamp path -->
                </div>
              </div>
            </div>
          </div>
          <div class="msme">
            <img src="/msme.png" alt="MSME Logo" width="150" height="100" />
            <!-- Replace with your MSME logo path -->
          </div>
        </div>
      </div>
    </div>
  </body>
</html>
`;

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
      pdf.save("letter_of_recommendation.pdf");
      document.body.removeChild(element);
      //   setloader(false);
    });
  }
};
