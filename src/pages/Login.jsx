import React, { useEffect, useState } from "react";
import Logo from "../assets/footerLogo.svg";
import InputField from "../components/InputField";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADMIN_LOGIN, REGISTER_ADMIN } from "../context/mutation";
import { toast } from 'react-toastify';
import CircularProgress from '@mui/material/CircularProgress';

const Login = () => {
  useEffect(()=>{
    if(localStorage.getItem("token")){
      navigate("/home")
    }
  })
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  const [loginAdmin] = useMutation(ADMIN_LOGIN);
  const [registerAdmin] = useMutation(REGISTER_ADMIN);

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setIsLoading(true);
    try {
      const { data } = await loginAdmin({ variables: { email, password } });
      const token = data?.adminLogin?.token;
      if(!token){
        toast.error(data?.adminLogin?.message||"Login failed. Please try again.");
        setIsLoading(false);
        return
      }
      localStorage.setItem("token", token);
      localStorage.setItem("isLoginPage", true);

      toast.success("Login successful!");
      navigate("/home");
    } catch (error) {
      toast.error(error?.message || "Login failed. Please try again.");
    }
    setIsLoading(false);
  };

  const handleRegister = async () => {
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setIsLoading(true);
    try {
      const { data } = await registerAdmin({ variables: { email, password } });
      const token = data?.registerAdmin?.token;
      if(!token){
        toast.error(data?.registerAdmin?.message||"Registration failed. Please try again.");
        setIsLoading(false);
        return
      }
      localStorage.setItem("token", token);
      toast.success("Registration successful!");
      localStorage.setItem("isLoginPage", true);
      navigate("/home");
    } catch (error) {
      toast.error(error?.message || "Registration failed. Please try again.");
    }
    setIsLoading(false);
  };

  const handleToggle = () => {
    setIsRegister(!isRegister);
    setEmail("");
    setPassword("");
    setError("");
  };

  return (
    <div className="fixed z-50 top-0 left-0 w-screen h-screen flex bg-white">
      <div className="hidden w-1/2 h-screen lg:flex justify-center items-center bg-[#031B89]">
        <img src={Logo} alt="logo" className="h-[6.125rem]" />
      </div>

      <div className="lg:w-1/2 w-full bg-white h-screen flex justify-center items-center">
        <div className="flex flex-col max-w-[33.438rem] gap-8">
          <div className=" flex gap-6 flex-col">
            <h1 className="text-[1.5rem] font-HelveticaNeueMedium text-[#0F172A]">
              {isRegister ? "Register to Multimeds" : "Login to Multimeds"}
            </h1>

            <div className="flex flex-col gap-2">
              {isRegister ? (
                <RegisterForm
                  email={email}
                  setEmail={setEmail}
                  password={password}
                  setPassword={setPassword}
                  error={error}
                  isLoading={isLoading}
                  isValidEmail={isValidEmail}
                  handleRegister={handleRegister}
                  handleToggle={handleToggle}
                />
              ) : (
                <LoginForm
                  email={email}
                  setEmail={setEmail}
                  password={password}
                  setPassword={setPassword}
                  error={error}
                  isLoading={isLoading}
                  isValidEmail={isValidEmail}
                  handleLogin={handleLogin}
                  handleToggle={handleToggle}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {isLoading && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <CircularProgress  color="success"  />
        </div>
      )}
    </div>
  );
};

const LoginForm = ({
  email,
  setEmail,
  password,
  setPassword,
  error,
  isLoading,
  isValidEmail,
  handleLogin,
  handleToggle
}) => (
  <>
    <InputField
      label="Enter your email ID"
      placeholder="Info@mymultimeds.com"
      setValue={setEmail}
      value={email}
      type="email"
      required
      onChange={(e) => {
        setEmail(e.target.value);
        if (!isValidEmail(e.target.value)) {
          setError("Invalid email address.");
        } else {
          setError("");
        }
      }}
    />

    <InputField
      label="Enter Password"
      placeholder="***********"
      setValue={setPassword}
      value={password}
      type="password"
      required
      onChange={(e) => setPassword(e.target.value)}
    />

    {error && <p className="text-red-500">{error}</p>}

    <button
      type="submit" 
      onClick={handleLogin}
      className="w-full font-HelveticaNeueMedium rounded text-[white] bg-[#031B89] py-4 px-[8.438rem] leading-[1.25rem]"
      disabled={isLoading || !isValidEmail(email) || !password}
    >
      {isLoading ? "Processing..." : "LOGIN"}
    </button>

    {/* <h5 onClick={handleToggle} className="cursor-pointer">
      Don't have an account? Register
    </h5> */}
  </>
);

const RegisterForm = ({
  email,
  setEmail,
  password,
  setPassword,
  error,
  isLoading,
  isValidEmail,
  handleRegister,
  handleToggle
}) => (
  <>
    <InputField
      label="Enter your email ID"
      placeholder="Info@mymultimeds.com"
      setValue={setEmail}
      value={email}
      type="email"
      required
      onChange={(e) => {
        setEmail(e.target.value);
        if (!isValidEmail(e.target.value)) {
          setError("Invalid email address.");
        } else {
          setError("");
        }
      }}
    />

    <InputField
      label="Enter Password"
      placeholder="***********"
      setValue={setPassword}
      value={password}
      type="password"
      required
      onChange={(e) => setPassword(e.target.value)}
    />

    {error && <p className="text-red-500">{error}</p>}

    <button
      type="submit" 
      onClick={handleRegister}
      className="w-full font-HelveticaNeueMedium rounded text-[white] bg-[#031B89] py-4 px-[8.438rem] leading-[1.25rem]"
      disabled={isLoading || !isValidEmail(email) || !password}
    >
      {isLoading ? "Processing..." : "REGISTER"}
    </button>

    <h5 onClick={handleToggle} className="cursor-pointer">
      Already have an account? Log In
    </h5>
  </>
);

export default Login;
