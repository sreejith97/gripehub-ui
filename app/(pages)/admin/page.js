"use client";
import ComplaintList from "@/components/ComplaintList/page";
import { useAuth } from "@/contexts/AuthContext";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const AdminPage = () => {
  const router = useRouter();
  const { login, user, setIsLogin } = useAuth();
  const [complaints, setComplaints] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isTableLoading, setIsTableLoading] = useState(true);
  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      router.push("/signin");
    } else {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${process.env.BASE_URL}profile`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          setIsLogin(true);
          login(response.data);
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching profile:", error);

          if (error.response && error.response.status === 401) {
            // Handle 401 Unauthorized: Redirect to login
            router.push("/signin");
          } else {
            // Handle other errors
            setIsLogin(false);
            setIsLoading(false);
            // You might want to handle errors differently
          }
        }
      };

      fetchData();
    }
  }, [isLoading, login, router, setIsLogin]);

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      router.push("/signin");
    } else {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${process.env.BASE_URL}get-complaints`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          setComplaints(response.data.complaints);
          console.log(response.data.complaints);
          setIsTableLoading(false);
        } catch (error) {
          console.error("Error fetching complaints:", error);

          if (error.response && error.response.status === 401) {
            // Handle 401 Unauthorized: Redirect to login
            router.push("/signin");
          } else {
            // Handle other errors
            setIsLoading(false);
            // You might want to handle errors differently
          }
        }
      };

      fetchData();
    }
  }, [setComplaints, router]);

  return (
    <div className="lg:px-10 px-4 flex flex-col items-center justify-center ">
      <div className="w-full">
        <h1 className="lg:text-[25px] text-[20px] uppercase text-slate-400 font-bold text-center ">
          Admin Dashboard
        </h1>
      </div>
      {/* <div className="my-6 w-full lg:w-auto flex flex-col lg:flex-row justify-center items-center lg:gap-10">
        <div
          className="w-full lg:w-[200px] h-[50px] lg:h-[70px] bg-blue-300 p-4 rounded-lg flex items-center justify-center cursor-pointer hover:scale-105 transition ease-in-out delay-150 hover:-translate-y-1 hover:bg-blue-500 duration-300 mb-4 lg:mb-0"
          onClick={() => {
            router.push("/admin/addUser");
          }}
        >
          Add User
        </div>
        <div
          className="w-full lg:w-[200px] h-[50px] lg:h-[70px] bg-blue-300 p-4 rounded-lg flex items-center justify-center cursor-pointer hover:scale-105 transition ease-in-out delay-150 hover:-translate-y-1 hover:bg-blue-500 duration-300 mb-4 lg:mb-0"
          onClick={() => {
            router.push("/admin/addComplaints");
          }}
        >
          Add Complaints
        </div>
        <div
          className="w-full lg:w-[200px] h-[50px] lg:h-[70px] bg-blue-300 p-4 rounded-lg flex items-center justify-center cursor-pointer hover:scale-105 transition ease-in-out delay-150 hover:-translate-y-1 hover:bg-blue-500 duration-300 mb-4 lg:mb-0"
          onClick={() => {
            router.push("/admin/checkStatus");
          }}
        >
          Check Status
        </div>
      </div> */}

      <div className="my-7">
        {complaints ? (
          complaints.length > 0 ? (
            <div className=" overflow-x-hidden w-full ">
              <ComplaintList complaints={complaints} />
            </div>
          ) : (
            <div>
              <h1 className="text-[24px] font-semibold">
                No Complaints to List...
              </h1>
            </div>
          )
        ) : isTableLoading ? (
          <div>
            <h1 className="text-[24px]">Loading Table ....</h1>
          </div>
        ) : (
          "No complaints"
        )}
      </div>
    </div>
  );
};

export default AdminPage;
