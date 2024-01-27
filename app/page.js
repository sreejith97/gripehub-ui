"use client";
import { useAuth } from "@/contexts/AuthContext";
import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AdminPage from "./(pages)/admin/page";
import PaymentPage from "./(pages)/payment/page";
import Header from "@/components/header/page";
import ServicePage from "./(pages)/service/page";
import ProductPage from "./(pages)/product/page";
import UserPage from "./(pages)/user/page";
import LoadingPage from "@/components/LoadingImage/page";

export default function Home() {
  const { login, user, setIsLogin } = useAuth();

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);

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
              Authorization: `Bearer ${token}`, // Use the token directly here
            },
          });

          setIsLogin(true);
          login(response.data);
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching profile:", error);

          if (error.response && error.response.status === 401) {
            // Handle 401 Unauthorized: Redirect to login or refresh token
            console.log("Unauthorized access. Redirecting to login page.");
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
    console.log(user?.user);
  }, [setIsLogin, setIsLoading]);

  // Rest of your component code...

  let componentToRender;

  switch (user?.user?.role) {
    case "ADMIN":
      componentToRender = <AdminPage />;
      break;
    case "PAYMENT":
      componentToRender = <PaymentPage />;
      break;
    case "SERVICE":
      componentToRender = <ServicePage />;
      break;
    case "PRODUCT":
      componentToRender = <ProductPage />;
      break;
    case "USER":
      componentToRender = <UserPage />;
      break;

    default:
      componentToRender = (
        <div className="flex items-center justify-center font-bold text-[25px]">
          Fetching user ...
        </div>
      );
  }

  return isLoading ? (
    <div className="">
      <LoadingPage />
    </div>
  ) : (
    <div className=""> {componentToRender}</div>
  );
}
