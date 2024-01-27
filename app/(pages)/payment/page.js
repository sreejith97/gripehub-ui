"use client";
import ComplaintList from "@/components/ComplaintList/page";
import { useAuth } from "@/contexts/AuthContext";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const PaymentPage = () => {
  const router = useRouter();
  const { login, user, setIsLogin } = useAuth();
  const [complaints, setComplaints] = useState();
  const [isTableLoading, setIsTableLoading] = useState(true);

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      router.push("/signin");
    } else {
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
  }, [isLoading, login, router, setIsLogin]);

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      router.push("/signin");
    } else {
      async function fetchData() {
        const getProfileData = await axios
          .get(`${process.env.BASE_URL}get-complaints`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
          })
          .then((response) => {
            setComplaints(response.data.complaints);
            console.log(response.data);
          })
          .then(() => {
            setIsLoading(false);
          });
      }
      fetchData();
    }
  }, []);
  return (
    <div className="px-10 flex flex-col items-center justify-center">
      <div className="w-full">
        <h1 className="lg:text-[25px] text-[20px] uppercase text-slate-400 font-bold text-center ">
          Payment Section
        </h1>
      </div>
      <div className="my-6 w-full lg:w-auto flex flex-col lg:flex-row justify-center items-center lg:gap-10">
        {/* <button className="p-2 bg-slate-500 rounded-lg">Add user</button>
        <button className="p-2 bg-slate-500 rounded-lg">Add user</button>
        <button className="p-2 bg-slate-500 rounded-lg">Add user</button> */}

        <div
          className="w-full lg:w-[200px] h-[50px] lg:h-[70px] bg-blue-300 p-4 rounded-lg flex items-center justify-center cursor-pointer hover:scale-105 transition ease-in-out delay-150 hover:-translate-y-1 hover:bg-blue-500 duration-300 mb-4 lg:mb-0"
          onClick={() => {
            router.push("/payment/addComplaints");
          }}
        >
          Add Complaints
        </div>
        <div
          className="w-full lg:w-[200px] h-[50px] lg:h-[70px] bg-blue-300 p-4 rounded-lg flex items-center justify-center cursor-pointer hover:scale-105 transition ease-in-out delay-150 hover:-translate-y-1 hover:bg-blue-500 duration-300 mb-4 lg:mb-0"
          onClick={() => {
            router.push("/payment/checkStatus");
          }}
        >
          Check Status
        </div>
      </div>

      <div className="my-7">
        {complaints ? (
          complaints.length > 0 ? (
            <div className="overflow-x-hidden w-full">
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
            <h1 className="text-[24px]">Loading Table....</h1>
          </div>
        ) : (
          "No complaints"
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
