"use client";
import React, { useEffect, useState } from "react";
import profileImage from "../../public/profile.jpg";
import Image from "next/image";
import {
  FaBars,
  FaFilePen,
  FaHouseChimney,
  FaMagnifyingGlass,
  FaRightFromBracket,
  FaUserPlus,
  FaX,
} from "react-icons/fa6";
import Link from "next/link";
import axios from "axios";
import Cookies from "js-cookie";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import LoadingPage from "../LoadingImage/page";

const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUserRole, setCurrentUserRole] = useState();
  const { login, user, setIsLogin } = useAuth();
  const router = useRouter();

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
            console.log(response.data.user.role);
            setCurrentUserRole(response.data.user.role);
          })
          .then(() => {
            setIsLoading(false);
          });
      }
      fetchData();
    }
  }, [isLoading]);

  const userRoles = {
    ADMIN: [
      {
        id: 1,
        name: "Home",
        link: "/",
        logo: <FaHouseChimney className="text-white text-[22px]" />,
      },
      {
        id: 2,
        name: "Add User",
        link: "/admin/addUser",
        logo: <FaUserPlus className="text-white text-[22px]" />,
      },
      {
        id: 3,
        name: "Add Complaints",
        link: "/admin/addComplaints",
        logo: <FaFilePen className="text-white text-[22px]" />,
      },
      {
        id: 4,
        name: "Check Status",
        link: "/admin/checkStatus",
        logo: <FaMagnifyingGlass className="text-white text-[22px]" />,
      },
      // Add more options for admin if needed
    ],
    PRODUCT: [
      {
        id: 1,
        name: "Home",
        link: "/",
        logo: <FaHouseChimney className="text-white text-[22px]" />,
      },
      {
        id: 2,
        name: "Add User",
        link: "/admin/adduser",
        logo: <FaUserPlus className="text-white text-[22px]" />,
      },
      {
        id: 3,
        name: "Add Complaint",
        link: "/admin/addcomplaint",
        logo: <FaFilePen className="text-white text-[22px]" />,
      },
    ],
    USER: [
      {
        id: 1,
        name: "Home",
        link: "/",
        logo: <FaHouseChimney className="text-white text-[22px]" />,
      },
      {
        id: 2,
        name: "Add Complaint",
        link: "/user/addComplaints",
        logo: <FaUserPlus className="text-white text-[22px]" />,
      },
      {
        id: 3,
        name: "Check Status",
        link: "/user/checkStatus",
        logo: <FaMagnifyingGlass className="text-white text-[22px]" />,
      },
    ],
    PAYMENT: [
      {
        id: 1,
        name: "Home",
        link: "/",
        logo: <FaHouseChimney className="text-white text-[22px]" />,
      },
      {
        id: 2,
        name: "Add Complaints",
        link: "/payment/addComplaints",
        logo: <FaFilePen className="text-white text-[22px]" />,
      },
      {
        id: 3,
        name: "Check Status",
        link: "/payment/checkStatus",
        logo: <FaMagnifyingGlass className="text-white text-[22px]" />,
      },
    ],
    SERVICE: [
      {
        id: 1,
        name: "Home",
        link: "/",
        logo: <FaHouseChimney className="text-white text-[22px]" />,
      },
      {
        id: 2,
        name: "Add Complaints",
        link: "/service/addComplaints",
        logo: <FaFilePen className="text-white text-[22px]" />,
      },
      {
        id: 3,
        name: "Check Status ",
        link: "/service/checkStatus",
        logo: <FaMagnifyingGlass className="text-white text-[22px]" />,
      },
    ],
  };

  const navOptions = userRoles[currentUserRole] || userRoles.default || [];
  //   console.log(currentUserRole);
  return (
    <>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <div className="max-h-screen h-screen relative grid grid-rows-12 grid-cols-12 gap-x-2 p-1 ">
          <div
            className={`col-start-1 col-end-3 row-start-1 row-end-13 bg-blue-500 h-full w-full rounded-xl p-4 relative hidden lg:block  ${
              isSidebarOpen ? "moveLeft" : "moveRight"
            }`}
          >
            <div className="flex items-center justify-center">
              <Link href="/">
                <div className="font-extrabold text-[32px] text-white">
                  GripeHub
                </div>
              </Link>
            </div>
            <div className="flex-1 flex flex-col gap-5 py-4">
              {navOptions.map((option) => (
                <div
                  className="flex flex-row items-center justify-start gap-3 cursor-pointer"
                  onClick={() => {
                    router.push(option.link);
                  }}
                >
                  {option.logo}
                  <p className="font-semibold text-white">{option.name}</p>
                </div>
              ))}
            </div>
            <div className="absolute bottom-4 left-0 w-full px-4">
              <div
                className=" rounded-xl py-2 bg-[#0000003b] hover:bg-[#00000050]   flex flex-row gap-3 items-center justify-center cursor-pointer"
                onClick={() => {
                  Cookies.remove("token");
                  router.push("/signin");
                  login("");
                }}
              >
                <p className="text-[18px] font-medium text-white">Logout</p>
                <FaRightFromBracket className="text-white text-[20px]" />
              </div>
            </div>
          </div>
          <div
            className={`col-start-1  col-end-13 row-start-1 row-end-2 w-full bg-slate-200 p-3 rounded-xl  flex items-center justify-between max-h-16 ${
              isSidebarOpen ? "lg:col-start-3 " : "lg:col-start-1"
            }`}
          >
            <div className="select-none">
              <FaBars
                className="text-[25px] cursor-pointer"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              />
            </div>
            <div className="flex flex-row items-center gap-3 select-none">
              {user ? `${user?.user?.name}` : "Profile"}
              <Image
                src={profileImage}
                className="rounded-full cursor-pointer"
                width={40}
                height={40}
              />
            </div>
          </div>
          <div
            className={`col-start-1  col-end-13 row-start-2 row-end-13 overflow-y-auto py-3 hide-scrollbar ${
              isSidebarOpen ? "lg:col-start-3 " : "lg:col-start-1 "
            }`}
          >
            {children}
          </div>
          <div
            className={`w-[400px] lg:hidden bg-blue-500 h-full rounded-r-3xl absolute p-4 flex items-start justify-center flex-col ${
              !isSidebarOpen ? "moveLeft" : "moveRight"
            }`}
          >
            {/* <div onClick={() => setIsSidebarOpen(!isSidebarOpen)}>close</div> */}
            <div className="w-full flex justify-end px-6 py-2">
              <FaBars
                className="text-[30px] text-white cursor-pointer"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              />
            </div>
            <div className="flex-1 flex justify-center items-center">
              <div className=" flex flex-col gap-6 py-4">
                {navOptions.map((option) => (
                  <div
                    className="flex flex-row items-center justify-start gap-3 cursor-pointer"
                    onClick={() => {
                      router.push(option.link);
                    }}
                  >
                    {option.logo}
                    <p className="font-semibold text-white text-[25px]">
                      {option.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div
              className=" w-full rounded-xl py-2 bg-[#0000003b] hover:bg-[#00000050]   flex flex-row gap-3 items-center justify-center cursor-pointer"
              onClick={() => {
                Cookies.remove("token");
                router.push("/signin");
                login("");
              }}
            >
              <p className="text-[18px] font-medium text-white">Logout</p>
              <FaRightFromBracket className="text-white text-[20px]" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardLayout;
