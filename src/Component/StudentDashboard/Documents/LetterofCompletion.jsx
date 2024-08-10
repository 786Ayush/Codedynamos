
export const LetterofCompletion = () => {
const letter=`<!DOCTYPE html>
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
        width: 21cm; /* A4 width */
        height: 29.7cm; /* A4 height */
        max-width: 100%;
        max-height: 100%;
        margin: 1.5cm auto; /* 2cm top and bottom, 1.5cm left and right */
        /* padding: 2cm; */
        background-color: #fff;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        box-sizing: border-box;
        overflow: hidden;
      }
      .header {
        margin-bottom: 20px;
        border-bottom: 2px solid #333; /* Example border */
        padding-bottom: 10px;
      }
      .logo {
        /* position: absolute; */
        top: 20px;
        right: 20px;
        width: 100px;
        height: auto;
      }
      .content {
        margin-left: 3rem;
        border-left: 4rem solid;
        border-image: linear-gradient(to bottom, #0dc4eb, #0c3fab) 1;
        padding: 3rem;
        height: 100%;
      }
      .text-content {
        color: #333;

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
      .text-content .background-overlay {
        /* Set the size of the background overlay to match the content */
        width: 100%;
        height: 100%;
        background-size: 350px; /* Adjust the background size if necessary */
        background-repeat: no-repeat; /* Ensure the background image doesn't repeat */
        background-position: center; /* Center the background image */
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
      .stamp{
        margin-left: 10vw;
      }
      .date{
        width: 100%;
        display: flex;
        justify-content: flex-end;
      }
      
    </style>
  </head>
  <body>
    <div class="container">
      <div class="content">
        <div class="logo_heading">
          <img
            src="../frontend//public/realogo2.png"
            alt="Company Logo"
            class="logo"
          />
          <div class="empId">CD-001</div>
        </div>
        <h1>To the Concerned Authority</h1>
        <div class="date">3-02-2003</div>
        <div class="text-content">
          <div class="background-overlay"></div>
          <p>
            This is to certify that Ayush Gupta, a student of CSE at GL Bajaj
            Group of Institutions, worked as an intern with CodeDynamos from
            January 2023 to February 2023.
          </p>

          <p>
            During this period, he held the position of Web Development
            Intern.<br /><br />
            Ayush Gupta demonstrated a remarkable level of responsibility,
            sincerity, and a genuine willingness to learn and take on new
            assignments and challenges.
          </p>
          <p>
            In particular, his coordination skills and communication skills are
            excellent, and his attention to detail is impressive.
          </p>
          <br />
          <p>We wish him all the very best for his future endeavors.</p>
        </div>

        <div class="flex">
          <div class="">
            <img
              src="./code-dynamos-logo-zip-file/png/logo-black.png"
              alt="signature"
              width="100"
              height="100"
            />
            <div class="flex">
              <div class="">
                <p>With regards,</p>
                <p>CodeDynamos</p>
              </div>
              <div class="stamp">
                <img
                  src="./code-dynamos-logo-zip-file/png/logo-black.png"
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
            src="./code-dynamos-logo-zip-file/png/logo-black.png"
            alt="signature"
            width="100"
            height="100"
          />
        </div>
      </div>
    </div>
  </body>
</html>
`;
  
}

