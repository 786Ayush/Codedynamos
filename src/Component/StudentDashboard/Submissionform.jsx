// pages/index.js
import React, { useEffect, useState } from "react";
import { Input, Button } from "@nextui-org/react";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
// import Razorpay from "razorpay"
import { supabase } from "../../utils/Supabase";

export default function Home() {
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
    firstQuestionGithubLink: "",
    secondQuestionGithubLink: "",
    thirdQuestionGithubLink: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  // const razorpay = new Razorpay({
  //   key: "rzp_test_5klJQUdrgNrAw0",
  //   // key_secret: "dn9IpB7PGIfawCeLDkunoSDA",
  // });
  const handlePaymentRequest = async () => {
  //   const options = {
  //     amount: 9900, // Amount in paise (99*100)
  //     currency: "INR",
  //     receipt: "order_receipt_" + Math.floor(Math.random() * 1000), // Replace with your unique receipt ID logic
  //     payment_capture: 1,
  //   };
  
  //   try {
  //     const response = await razorpay.orders.create(options);
  //     console.log("Payment request created:", response);
  //     // Redirect the user to the Razorpay checkout page
  //     window.location = response.receipt;
  //   } catch (error) {
  //     console.error("Error creating payment request:", error);
  //     // Handle the error here, e.g., display an error message to the user
  //   }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Handle form submission logic here
    console.log(formData);
    // Call handlePaymentRequest
    await handlePaymentRequest();
  };

  return (
    <div className="flex md:flex-row flex-col justify-center items-center h-screen bg-gradient-to-br from-gray-900 to-gray-500 text-white ">
      <img src="/reallogo.png" alt="Logo" className="md:w-1/2 w-24 " />
      <div className="md:w-1/2 flex justify-center flex-col items-center">
        <h1 className="text-3xl font-semibold mb-8 text-zinc-300">
          Task Submission Form
        </h1>
        <form onSubmit={handleSubmit} className="w-full max-w-md text-center">
          {userData && userData.sector === "web development" && (
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
