"use client";
import React, { useState } from "react";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

export default function Signin() {
  console.log(process.env.BASE_URL);
  // Step 2: Add state variables for email, emailError, and handleEmailChange
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const { login, user, setIsLogin } = useAuth();
  // Step 3: Create a function to validate the email format
  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
      return false;
    }
    setEmailError("");
    return true;
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 absolute top-0 w-full">
        <div className="bg-white p-8 rounded-md shadow-md max-w-md w-full h-screen lg:h-auto flex items-center justify-center">
          <div>
            <h1 className="text-3xl font-bold mb-6">Welcome to GripeHub</h1>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                if (validateEmail()) {
                  try {
                    const response = await axios.post(
                      `${process.env.BASE_URL}login`,
                      {
                        password: password,
                        email: email,
                      },
                      {
                        headers: {
                          "Content-Type": "application/json",
                        },
                      }
                    );

                    if (response.status === 200) {
                      const data = response.data;
                      Cookies.set("token", data.token, { expires: 7 });

                      await axios
                        .get(`${process.env.BASE_URL}profile`, {
                          headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${Cookies.get("token")}`,
                          },
                        })
                        .then((response) => {
                          setIsLogin(true);
                          login(response.data);
                        });

                      router.push("/");
                    } else {
                      console.error(
                        `Login failed with status ${response.status}`
                      );
                    }
                  } catch (error) {
                    console.error("An error occurred:", error);
                  }
                } else {
                  console.log("Provide a valid email");
                }
              }}
              className="flex flex-col gap-4"
            >
              <label htmlFor="email" className="text-sm font-semibold">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your e-mail"
                className="h-10 px-3 border rounded-md focus:outline-none focus:border-blue-500"
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailError && (
                <p className="text-red-500 text-xs mt-1">{emailError}</p>
              )}

              <label htmlFor="password" className="text-sm font-semibold">
                Password
              </label>
              <input
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
                className="h-10 px-3 border rounded-md focus:outline-none focus:border-blue-500"
              />
              <div className="flex items-center justify-center">
                <h1>
                  Not a User?{" "}
                  <Link href="/signup" className="text-blue-400">
                    Signup
                  </Link>
                </h1>
              </div>

              <button
                type="submit"
                className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
              >
                Log In
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
