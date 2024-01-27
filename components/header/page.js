"use client";
import { useAuth } from "@/contexts/AuthContext";
import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Header = ({}) => {
  const { login, user, setIsLogin } = useAuth();
  const router = useRouter();
  // console.log(user?.user);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      async function fetchData() {
        const getProfileData = await axios
          .get(`${process.env.BASE_URL}profile`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
          })
          .then((response) => {
            setIsLogin(true);
            login(response.data);
          })
          .then(() => {
            setIsLoading(false);
          });
      }
      fetchData();
    }
  }, [isLoading]);

  return (
    <div className="w-full bg-blue-500 flex items-center justify-between flex-row h-[60px] px-4 lg:px-10 absolute top-0">
      <Link href="/">
        <div className="font-extrabold text-[32px] text-white">GripeHub</div>
      </Link>
      <div className="flex flex-row gap-4 lg:gap-6">
        <div
          className={` text-white cursor-pointer ${user ? "" : "hidden"}`}
          onClick={() => {
            Cookies.remove("token");
            router.push("/signin");
            login("");
          }}
        >
          Logout
        </div>
        <div
          className={` text-white cursor-pointer ${user ? "hidden" : ""}`}
          onClick={() => {
            router.push("/signup");
          }}
        >
          Signup
        </div>

        <div className={`text-white cursor-default ${user ? "" : "hidden"}`}>
          {user ? user?.user?.name : "Profile"}
        </div>
      </div>
    </div>
  );
};

export default Header;
