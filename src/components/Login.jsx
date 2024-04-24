import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";

import { Link } from "react-router-dom";
import OtpInput from "react-otp-input";
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import "react-toastify/dist/ReactToastify.css";
import LoginCarousel from "./LoginCarousel";
import PrimaryButton from "./PrimaryButton";
import Google from "../assets/login/googleLogo.svg";
import Edit from "../assets/login/editIcon.svg";
import Check from "../assets/login/checkIcon.svg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Cancel, ContentCopy } from "@mui/icons-material";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import Loader from "./loader";
import Context from "../context/AppContext";

const SENDOTP = gql`
  mutation sendOTP($input: OTPInput!) {
    sendOTP(input: $input) {
      status
      message
    }
  }
`;

const SENDEMAILOTP = gql`
  mutation sendEmailOTP($input: EmailOTPInput!) {
    sendEmailOTP(input: $input) {
      status
      message
    }
  }
`;

const VERIFYOTP = gql`
  mutation verifyOTP($input: OTPVerifyInput!) {
    verifyOTP(input: $input) {
      status
      message
      token
      isNewUser
      user {
        id
        fullName
        contactNumber
        email
        profilePicture
        walletBalance
        role
        successfulReferrals
        referralDiscountPercentage
        remainingReferralDiscounts
        currentAddress {
          id
          houseNumber
          aptOrBuildingName
          streetOrAreaName
          city
          pincode
          state
          label
        }
        department {
          id
          name
          description
          permissions
        }
        addresses {
          id
          houseNumber
          aptOrBuildingName
          streetOrAreaName
          city
          pincode
          state
          label
        }
        prescriptions {
          id
          url
          userId
          isApproved
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
    }
  }
`;

const GOOGLE_SIGN_IN = gql`
  mutation googleSignIn($input: GoogleSignInInput!) {
    googleSignIn(input: $input) {
      status
      message
      token
      isNewUser
      user {
        id
        fullName
        contactNumber
        email
        profilePicture
        walletBalance
        role
        successfulReferrals
        referralDiscountPercentage
        remainingReferralDiscounts
        currentAddress {
          id
          houseNumber
          aptOrBuildingName
          streetOrAreaName
          city
          pincode
          state
          label
        }
        department {
          id
          name
          description
          permissions
        }
        addresses {
          id
          houseNumber
          aptOrBuildingName
          streetOrAreaName
          city
          pincode
          state
          label
        }
        prescriptions {
          id
          url
          userId
          isApproved
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
    }
  }
`;

const CHECK_USER = gql`
  query CheckUser($input: CheckUserInput!) {
    checkUser(input: $input) {
      status
      message
      isUserPresent
    }
  }
`;
const Login = ({ ref, isLogin, setIsLogin, setUserDetails }) => {
  const loginRef = useRef();
  const navigate = useNavigate();
  const {setUserLoggedIn,setCartList}=useContext(Context)
  const [errorMessage, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isReferralWindow, setIsReferralWindow] = useState(false);
  const [referralCode, setReferralCode] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isOtpWindow, setIsOtpWindow] = useState(false);
  const [loginMethod, setLoginMethod] = useState("phone number");
  const [loginId, setLoginId] = useState("");
  const [otp, setOtp] = useState("");
  let googleLogin=false;
  let googleResponse={};
  const backdropRef = useRef(); // Reference to the backdrop
  const [sendOTP, { loading: otpLoading }] = useMutation(SENDOTP);
  const [sendEmailOTP, { loading: emailLoading }] = useMutation(SENDEMAILOTP);
  const [verifyOTP, { loading: verifyLoading }] = useMutation(VERIFYOTP);
  const [checkUser] = useLazyQuery(CHECK_USER);
  const [googleSignIn, { data, loading: googleSignInLoading, error }] =
    useMutation(GOOGLE_SIGN_IN);

  const handleBackdropClick = (e) => {
    if (e.target === backdropRef.current) {
      e.stopPropagation();
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleBackdropClick);
    return () => {
      document.removeEventListener("click", handleBackdropClick);
    };
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (!loginRef.current.contains(e.target)) {
        setIsLogin(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  const openReferralWindow = () => {
    setReferralCode("");
    setOtp("");
    setIsReferralWindow(true);
  };

  const closeReferralWindow = () => {
    setIsReferralWindow(false);
    openOtpWindow(); // Open OTP window after closing referral window
  };

  const openOtpWindow = async (e) => {
    // setIsReferralWindow(false);

    if (e) {
      e.preventDefault();
    }
    setError("");

    setLoading(true);

    try {
      let method, mutation;
      if (loginMethod !== "email") {
        method = "sendOTP";
        mutation = sendOTP;
      } else {
        method = "sendEmailOTP";
        mutation = sendEmailOTP;
      }

      const input =
        loginMethod !== "email"
          ? { countryCode: countryCode, phoneNumber: phoneNumber } // Include referralCode
          : { email: inputValue }; // Include referralCode

      const { data } = await mutation({ variables: { input } });

      setLoading(false);

      if (data[method].status === "SUCCESS") {
        toast.success("OTP Sent Successfully");
        setIsOtpWindow(true);
      } else {
        toast.error(`Error: ${data[method].message}`);
      }
    } catch (error) {
      console.error("Error in sending OTP:", error);
      setLoading(false);
      toast.error(`OTP not sent, server error.`);
    }
  };

  const closeOtpWindow = () => {
    setIsReferralWindow(false);
    setIsOtpWindow(false);
  };

  const handleSubmit = async () => {
    setError("");
    const variObj = {
      countryCode: countryCode,
      phoneNumber: phoneNumber,
      otp: otp,
      referralCode, // Include referralCode
    };

    setLoading(true);

    try {
      const res = await verifyOTP({ variables: { input: variObj } });

      if (res.data.verifyOTP.status === "SUCCESS") {
        localStorage.setItem("token", res.data.verifyOTP.token);
        localStorage.setItem('shouldShowBanner', 'true');

        setUserDetails(res.data.verifyOTP.token);
        localStorage.setItem(
          "userInfo",
          JSON.stringify(res.data.verifyOTP.user)
        );
        localStorage.setItem("isLoggedInNow", true);
        setReferralCode("");
        setOtp("");
        setIsReferralWindow(false);
        setIsLogin(false);
        setUserLoggedIn(true);
        setCartList([]);
        navigate("/");
      } else {
        toast.error(`OTP not verified!`);
      }
    } catch (err) {
      toast.error(`OTP not verified!`);
    } finally {
      setLoading(false);
    }

    setIsLogin(false);
  };

  const handleClick = () => {
    setError("");
    setLoginMethod(loginMethod === "phone number" ? "email" : "phone number");
  };

  const validateInput = (value) => {
    if (loginMethod === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        setError("Please enter a valid email address");
        return false;
      }
    } else {
      // No need for additional validation as the PhoneInput component handles it
    }
    setError("");
    return true;
  };

  const handleChange = (value) => {
    setInputValue(value);
    if (loginMethod === "email") {
      validateInput(value);
      setLoginId(`${value?.slice(0, 4)}xxxxxx.${value?.slice(-4)}`);
    } else {
      setLoginId(`XXXXX${value?.slice(-4)}x`);
    }

    // Split the value to extract country code and phone number
    const phoneNumberWithoutCode = value?.slice(-10);
    const countryCodeWithoutPhoneNumber = value?.slice(0, -phoneNumber?.length);
    setCountryCode(countryCodeWithoutPhoneNumber);
    setPhoneNumber(phoneNumberWithoutCode);
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (codeResponse) => {
      console.log(codeResponse.access_token);
      if (codeResponse && codeResponse.access_token) {
        axios
          .get(
            `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${codeResponse.access_token}`,
            {
              headers: {
                Authorization: `Bearer ${codeResponse.access_token}`,
                Accept: "application/json",
              },
            }
          )
          .then((res) => {
            console.log(res.data);
            googleResponse=res.data;
            googleLogin=true;
            CheckUser();
          })
          .catch((err) => console.log(err));
      }
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  const CheckUser = async (e) => {
    e?.preventDefault();
    // Initialize an empty object for userCheckInput
    let userCheckInput = {};
  
    // Conditionally set userCheckInput based on whether it's a Google login or phone login
    if (googleLogin) {
      // For Google login, use the email address
      if (googleResponse?.email) {
        userCheckInput = { email: googleResponse.email };
      } else {
        // Handle the case where Google login doesn't provide an email
        console.error("Google login response does not contain an email address.");
        return; // Optionally, add error handling or user notification here
      }
    } else {
      // For phone login, use the phone number
      if (phoneNumber) {
        userCheckInput = { contactNumber: phoneNumber };
      } else {
        // Handle the case where phone number is not provided
        console.error("Phone number is empty.");
        return; // Optionally, add error handling or user notification here
      }
    }
  
    checkUser({
      variables: { input: userCheckInput },
      onCompleted: (data) => {
        // Assuming 'isUserPresent' field indicates if the user exists
        if (data.checkUser.isUserPresent) {
          // Handle existing user logic
          if (!googleLogin) {
            openOtpWindow();
          } else {
            signInViaGoogle();
          }
        } else {
          // Handle new user logic
          if (!googleLogin) {
            openReferralWindow();
          } else {
            signInViaGoogle();
          }
        }
      },
      onError: (error) => {
        // Handle error scenario (e.g., network error)
        console.error("Error checking user:", error);
        toast.error("Failed to check user. Please try again.");
      },
    });
  };
  
  const handlePaste = () => {
    navigator.clipboard
      .readText()
      .then((text) => {
        setReferralCode(text);
      })
      .catch((err) => {
        console.error("Failed to read clipboard:", err);
      });
  };

  const signInViaGoogle = async () => {
    try {
      const response = await googleSignIn({
        variables: {
          input: {
            gmail: googleResponse?.email, // The email address obtained from Google
            referralCode: referralCode || "", // Optional: A referral code if you have one, else an empty string
          },
        },
      });

      if (response.data.googleSignIn.status === "SUCCESS") {
        localStorage.setItem("token", response.data.googleSignIn.token);
        setUserDetails(response.data.googleSignIn.token);
        response.data.googleSignIn.user.email=googleResponse?.email
        localStorage.setItem(
          "userInfo",
          JSON.stringify(response.data.googleSignIn.user)
        );
        localStorage.setItem("isLoggedInNow", true);
        localStorage.setItem('shouldShowBanner', 'true');
        googleLogin=false;
        
        setReferralCode("");
        setOtp("");
        setIsReferralWindow(false);
        setIsLogin(false);
        setUserLoggedIn(true);
        setCartList([]);
        navigate("/");
      } else {
        toast.error(response.data.googleSignIn.message);
      }
    } catch (err) {
      toast.error("Google sign-in failed.");
    }
  };

  return (
    <div>
      <div
        ref={ref}
        className="w-screen h-screen fixed top-0 left-0 z-50 flex justify-center items-center bg-black bg-opacity-40"
      >
        <div
          ref={loginRef}
          className="w-[54.5rem] flex justify-center items-center max-w-[54.5rem] rounded-xl p-6 gap-6 bg-white shadow-login relative"
        >
          <LoginCarousel />
          {(loading ||googleSignInLoading||verifyLoading||otpLoading) &&  <Loader />}
          <Cancel
            className="absolute top-4 right-4 cursor-pointer"
            onClick={() => setIsLogin(false)}
          />
          {!isOtpWindow && !isReferralWindow ? (
            <div className="w-full flex flex-col gap-8">
              <div className="flex gap-4 flex-col">
                <div className="flex gap-1 flex-col">
                  <h1 className="text-[1.5rem] font-HelveticaNeueMedium text-[#0F172A]">
                    Login/Signup to Multimeds
                  </h1>
                  <h2 className="font-HelveticaNeueLight text-[#475569]">
                    Enter your {loginMethod} to receive an OTP
                  </h2>
                </div>
                <form className="flex flex-col gap-2">
                  <PhoneInput
                    international
                    defaultCountry="IN"
                    value={inputValue}
                    onChange={handleChange}
                    placeholder="Enter mobile number"
                    className="min-h-10 p-4 rounded border border-[#CBD5E1] focus:outline-none text-[0.875rem] py-[0.813rem] px-4 placeholder:text-[#E2E8F0] font-medium placeholder:text-[0.875rem] placeholder:font-medium"
                  />
                  {errorMessage && (
                    <p className="text-red-500">{errorMessage}</p>
                  )}
                  <PrimaryButton
                    disable={errorMessage || !inputValue ? true : false}
                    handleClick={CheckUser} // Open referral window first
                    title="LOGIN"
                  />
                  <p className="text-[0.75rem] text-[#475569]">
                    By logging in, you have agreed to our{" "}
                    <Link
                      to="/terms-and-conditions"
                      onClick={() => setIsLogin(false)}
                      className="text-[#FBA79B]"
                      href=""
                    >
                      terms and conditions
                    </Link>{" "}
                    and{" "}
                    <Link
                      to="/privacypolicy"
                      className="text-[#FBA79B]"
                      onClick={() => setIsLogin(false)}
                      href=""
                    >
                      privacy policy
                    </Link>
                  </p>
                </form>
              </div>
              <div className="flex flex-col gap-4">
                <h1 className="text-center text-[0.75rem] font-InterMedium text-[#94A3B8]">
                  or login with
                </h1>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleGoogleLogin}
                    className="w-full flex justify-center rounded p-4 gap-2 border border-[#CBD5E1]"
                  >
                    <img src={Google} />
                  </button>
                </div>
              </div>
              <p className="text-[#0F172A]  text-[0.75rem] font-HelveticaNeueMedium">
                Need help?{" "}
                <Link
                  to={"/contact-us"}
                  onClick={() => setIsLogin(false)}
                  className="text-[#7487FF]"
                  href=""
                >
                  Contact Us
                </Link>
              </p>
            </div>
          ) : isOtpWindow ? (
            <div className="w-full flex flex-col gap-6">
              <div className="flex gap-1 flex-col">
                <h1 className="text-[1.5rem] font-HelveticaNeueMedium text-[#0F172A]">
                  Enter your OTP
                </h1>
                <div className="flex gap-2">
                  <h2 className="font-HelveticaNeueLight text-[#475569]">
                    Enter the OTP received on {loginId}
                  </h2>
                  <button onClick={closeOtpWindow}>
                    <img src={Edit} />
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex gap-2 items-center">
                  <OtpInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={4}
                    renderSeparator={false}
                    renderInput={(props) => <input {...props} />}
                    containerStyle={"flex gap-2"}
                    inputStyle={`min-w-[2.25rem] h-[2.5rem] py-[0.813rem] px-3 ${
                      otp === "" ? "border border-[#CBD5E1]" : null
                    } ${otp !== "" ? "border border-[#CBD5E1]" : null} rounded`}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-[#0F172A] text-[0.75rem]">
                  Didn't get an OTP?{" "}
                  <button
                    onClick={openOtpWindow}
                    className="text-[#7487FF]  font-HelveticaNeueMedium"
                  >
                    Resend Code
                  </button>
                </p>
                <Link>
                  <PrimaryButton
                    disable={!otp ? true : false}
                    handleClick={() => {
                      setLoading(true);
                      handleSubmit();
                    }}
                    title="SUBMIT"
                  />
                </Link>
              </div>
              <p className="text-[#0F172A]  text-[0.75rem] font-HelveticaNeueMedium">
                Need help?{" "}
                <Link
                  to={"/contact-us"}
                  onClick={() => setIsLogin(false)}
                  className="text-[#7487FF]"
                  href=""
                >
                  {" "}
                  Contact Us
                </Link>
              </p>
            </div>
          ) : (
            isReferralWindow && (
              <div
                className="w-full flex flex-col
            gap-6"
              >
                <div className="flex gap-1 flex-col">
                  <h1 className="text-[1.5rem] font-HelveticaNeueMedium text-[#0F172A]">
                    Enter your Referral Code
                  </h1>
                  <div className="flex gap-2">
                    <h2 className="font-HelveticaNeueLight text-[#475569]">
                      This step is optional.
                    </h2>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2 items-center">
                    <input
                      type="text"
                      value={referralCode}
                      onChange={(e) => setReferralCode(e.target.value)}
                      placeholder="Enter Referral Code"
                      className="min-w-[2.25rem] h-[2.5rem] py-[0.813rem] px-3 border border-[#CBD5E1] rounded"
                    />
                    {/* Render the paste icon */}
                    <button onClick={handlePaste} title="Paste Referral Code">
                      <ContentCopy />
                    </button>
                  </div>
                </div>
                <div className="flex flex-row gap-2">
                  <PrimaryButton
                    className="w-50"
                    disable={!referralCode ? true : false}
                    handleClick={() => {
                      setLoading(true);
                      openOtpWindow();
                    }}
                    title="SUBMIT"
                  />
                  <PrimaryButton
                    handleClick={() => {
                      openOtpWindow();
                    }}
                    title="SKIP"
                  />
                </div>
                <p className="text-[#0F172A]  text-[0.75rem] font-HelveticaNeueMedium">
                  Need help?{" "}
                  <Link
                    to={"/contact-us"}
                    onClick={() => setIsLogin(false)}
                    className="text-[#7487FF]"
                    href=""
                  >
                    {" "}
                    Contact Us
                  </Link>
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};
export default Login;
