"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

// ... (import any necessary dependencies)

const Signup = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [message, setMessage] = useState("Creating user...");
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = () => {
    // Add your email validation logic here
    // For simplicity, let's assume it's valid if not empty
    return email.trim() !== "";
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (validateEmail()) {
      try {
        const response = await axios.post(
          `${process.env.BASE_URL}register`,
          {
            name: name,
            email: email,
            password: password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 201) {
          // Successful signup, redirect to login or any other page
          setIsLoading(false);
          router.push("/signin");
        } else if (response.status === 202) {
          setEmailError("User with this email already exists");
        } else {
          console.error(`Signup failed with status ${response.status}`);
        }
      } catch (error) {
        if (error.response && error.response.status === 202) {
          // User Already Exist
          setEmailError("User with this email already exists");
        } else {
          // Other errors
          console.error("An error occurred:", error);
        }
      } finally {
        setIsLoading(false);
      }
    } else {
      setEmailError("Provide a valid email");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 absolute top-0 w-full">
      <div className="bg-white p-8 rounded-md shadow-md max-w-md w-full h-screen lg:h-auto flex items-center justify-center">
        <div>
          <h1 className="text-3xl font-bold mb-6">Sign Up for GripeHub</h1>
          <form onSubmit={handleSignUp} className="flex flex-col gap-4">
            <label htmlFor="name" className="text-sm font-semibold">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              placeholder="Enter your name"
              className="h-10 px-3 border rounded-md focus:outline-none focus:border-blue-500"
              onChange={(e) => setName(e.target.value)}
            />

            <label htmlFor="email" className="text-sm font-semibold">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              placeholder="Enter your e-mail"
              className="h-10 px-3 border rounded-md focus:outline-none focus:border-blue-500"
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError("");
              }}
            />
            {emailError && (
              <p className="text-red-500 text-md ">{emailError}</p>
            )}

            <label htmlFor="password" className="text-sm font-semibold">
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name="password"
              required
              id="password"
              placeholder="Enter your password"
              className="h-10 px-3 border rounded-md focus:outline-none focus:border-blue-500"
            />
            {isLoading && (
              <div className="w-full flex items-center justify-center">
                {message}
              </div>
            )}

            <button
              type="submit"
              className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
