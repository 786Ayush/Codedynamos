// pages/index.js
import React, { useEffect, useState } from "react";
import { Input, Button } from "@nextui-org/react";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
// import Razorpay from "razorpay"
import { supabase } from "../../utils/Supabase";
import { useNavigate } from "react-router-dom";
// Import the useRouter hook from Next.js

export default function Home() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const encryptedUser = Cookies.get("encryptedUser");
    if (encryptedUser) {
      const decryptedUserBytes = CryptoJS.AES.decrypt(
        encryptedUser,
        "secretKey"
      );
      const decryptedUserData = decryptedUserBytes.toString(CryptoJS.enc.Utf8);

      // Parse decrypted user data
      const userData = JSON.parse(decryptedUserData);

      // Perform any additional checks if needed

      // Set login state to true
      console.log(userData);
      setUserData(userData);
    }
  }, []);

  const [formData, setFormData] = useState({
    firstQuestionLiveLink: "",
    firstQuestionGithubLink: "",
    secondQuestionGithubLink: "",
    secondQuestionLiveLink: "",
    thirdQuestionGithubLink: "",
    thirdQuestionLiveLink: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePaymentRequest = async () => {
    var options = {
      key: "rzp_test_JcgHgVhruPREWK",
      key_secret: "pCOq1NJwb8u8Rcj92LrtSzQv",
      amount: "9900",
      currency: "INR",
      name: "CodeDynamos",
      description: "hey there",
      handler: async (resp) => {
        // alert(resp.razorpay_payment_id);
        
        if (resp.razorpay_payment_id) {
          const { data, error } = await supabase
            .from("responseoftaskdetails")
            .insert([
              {
                student_id: userData.student_id, // Replace with the appropriate student ID
                firstquestionlivelink: formData.firstQuestionLiveLink,
                firstquestiongithublink: formData.firstQuestionGithubLink,
                secondquestionlivelink: formData.secondQuestionLiveLink,
                secondquestiongithublink: formData.secondQuestionGithubLink,
                thirdquestionlivelink: formData.thirdQuestionLiveLink,
                thirdquestiongithublink: formData.thirdQuestionGithubLink,
                payment_boolean: true,
                payment_link: resp.razorpay_payment_id, // Replace with the actual payment link
              },
            ]);
          // console.log(data, error);
        }
        navigate("/dashboard");
      },
      prefill: {
        name: "Ayush",
        email: "guptaayush617@gmail.com",
        contact: "9756573003",
      },
      notes: {
        address: "",
      },
      theme: {
        color: "#3399cc",
      },
      method: {
        upi: true,
      },
    };
    var pay = new window.Razorpay(options);
    pay.open();
  };

  const validateForm = () => {
    const errors = {};
    const urlPattern =
      /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;

    if (!formData.firstQuestionGithubLink) {
      errors.firstQuestionGithubLink = "url for Question 1 is required";
    } else if (!urlPattern.test(formData.firstQuestionGithubLink)) {
      errors.firstQuestionGithubLink = "Invalid link format";
    }
    setErrors(errors);
    console.log(errors);

    return true;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = await validateForm();

    if (!validationErrors) {
      // Submit form data
      await handlePaymentRequest();
      console.log(formData);
    }
    // Call handlePaymentRequest
  };

  return (
    <div className="flex md:flex-row flex-col justify-center items-center h-screen bg-gradient-to-br from-gray-900 to-gray-500 text-white ">
      <img src="/reallogo.png" alt="Logo" className="md:w-1/2 w-24 " />
      <div className="md:w-1/2 flex justify-center flex-col items-center">
        <h1 className="text-3xl font-semibold mb-8 text-zinc-300">
          Task Submission Form
        </h1>
        <form onSubmit={handleSubmit} className="w-full max-w-md text-center">
          {userData && userData.sector === "Web Development Intern" && (
            <>
              <div className="mb-4">
                <Input
                  name="firstQuestionLiveLink"
                  label="Live Link for Question 1"
                  value={formData.firstQuestionLiveLink}
                  onChange={handleChange}
                  required
                  color="default"
                />
                {errors && (
                  <p className="text-start text-red-400">
                    {errors.firstQuestionGithubLink}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <Input
                  name="firstQuestionGithubLink"
                  label="GitHub Link for Question 1"
                  value={formData.firstQuestionGithubLink}
                  onChange={handleChange}
                  required
                  color="default"
                />
                {errors && (
                  <p className="text-start text-red-400">
                    {errors.firstQuestionGithubLink}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <Input
                  name="secondQuestionLiveLink"
                  label="Live Link for Question 2"
                  value={formData.secondQuestionLiveLink}
                  onChange={handleChange}
                  required
                  color="default"
                />
              </div>
              <div className="mb-4">
                <Input
                  name="secondQuestionGithubLink"
                  label="GitHub Link for Question 2"
                  value={formData.secondQuestionGithubLink}
                  onChange={handleChange}
                  required
                  color="default"
                />
              </div>
              <div className="mb-4">
                <Input
                  name="thirdQuestionLiveLink"
                  label="Live Link for Question 3"
                  value={formData.thirdQuestionLiveLink}
                  onChange={handleChange}
                  required
                  color="default"
                />
              </div>
              <div className="mb-4">
                <Input
                  name="thirdQuestionGithubLink"
                  label="GitHub Link for Question 3"
                  value={formData.thirdQuestionGithubLink}
                  onChange={handleChange}
                  required
                  color="default"
                />
              </div>
            </>
          )}
          {userData && userData.sector !== "web development" && (
            <>
              <div className="mb-4">
                <Input
                  name="firstQuestionGithubLink"
                  label="GitHub Link for Question 1"
                  value={formData.firstQuestionGithubLink}
                  onChange={handleChange}
                  color="default"
                  helperText={errors.firstQuestionGithubLink}
                  required
                />
                {errors && (
                  <p className="text-start text-red-400">
                    {errors.firstQuestionGithubLink}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <Input
                  name="secondQuestionGithubLink"
                  label="GitHub Link for Question 2"
                  value={formData.secondQuestionGithubLink}
                  onChange={handleChange}
                  required
                  color="default"
                />
              </div>
              <div className="mb-4">
                <Input
                  name="thirdQuestionGithubLink"
                  label="GitHub Link for Question 3"
                  value={formData.thirdQuestionGithubLink}
                  onChange={handleChange}
                  required
                  color="default"
                />
              </div>
            </>
          )}
          <Button type="submit" color="success">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}
