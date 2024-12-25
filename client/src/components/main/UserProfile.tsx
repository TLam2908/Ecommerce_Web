"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { getUserById } from "@/lib/authApi";
import Image from "next/image";

import avatar from "@/assets/landingPage/placeholder.jpg";
import UserClient from "@/components/main/user/UserClient";
import useEditUserModal from "@/hook/useEditUserModal";

import { PiGlobeStand } from "react-icons/pi";
import { FiPhone } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import { IoPersonOutline } from "react-icons/io5";
import { Separator } from "../ui/separator";

const UserProfile = () => {
  const editUser = useEditUserModal();
  const router = useRouter();
  const params = useParams();

  const userId = Array.isArray(params.userId)
    ? params.userId[0]
    : params.userId;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["userId", userId],
    queryFn: () => getUserById(userId),
  });

  const orderLength = data?.data.Cart.length;
  const userAvatar = data?.data.image_src;

  return (
    <>
      <div
        className="pt-[70px] gap-4 max-w-[1540px] bg-white
      mx-auto 
      xl:px-20
      md:px-10
      sm:px-2
      px-4
      pb-20"
      >
        <div className="grid grid-cols-3 gap-20 max-xl:grid-cols-1">
          <div className="flex flex-col gap-10 col-span-1 relative">
            <div
              className="flex flex-col gap-10 sticky top-[100px] 
                            max-xl:flex-row max-xl:grid max-xl:grid-cols-2 max-xl:gap-24 
                            max-lg:flex max-lg:flex-col max-lg:justify-center max-lg:items-center max-lg:pl-20"
            >
              <div className="flex flex-row w-[380px] h-[240px] justify-around items-center shadow-2xl rounded-[20px] gap-6 px-6 py-6">
                <div className="flex flex-col justify-center items-center text-center gap-4">
                  <Image
                    src={userAvatar || avatar}
                    alt="Avatar"
                    width={70}
                    height={70}
                    className="rounded-full"
                  />
                  <div>
                    <h1 className="font-bold text-xl">{data?.data.name}</h1>
                    {data?.data.role === "admin" ? (
                      <p className="text-md font-bold">Admin</p>
                    ) : (
                      <p className="text-md font-bold">User</p>
                    )}
                  </div>
                </div>
                <div className="text-center">
                  <h1 className="font-semibold text-5xl text-[#db0b63]">
                    {orderLength}
                  </h1>
                  <p className="text-lg">Order in AutoPart</p>
                </div>
              </div>

              <div className="flex flex-row w-[380px] h-[240px] items-center border-2 border-gray-400 rounded-[20px] gap-6 py-6 px-6">
                <div>
                  <div className="font-bold text-xl mb-4">
                    {data?.data.name}'s confirmed information
                  </div>
                  {/* {provider === "google" ||
                  (role === "admin" && userData?.provider === "google") ? (
                    <>
                      <div className="text-xl text-left flex flex-row justify-start mb-[10px]">
                        <GoCheck className="ml-2" size={30} />
                        <span className="ml-6">Identity</span>
                      </div>
                      <div className="text-xl text-left flex flex-row justify-start mb-[10px]">
                        <GoCheck className="ml-2" size={30} />
                        <span className="ml-6">Email address</span>
                      </div>
                      <div className="text-xl text-left flex flex-row justify-start mb-[10px]">
                        <GoCheck className="ml-2" size={30} />
                        <span className="ml-6">Phone number</span>
                      </div>
                    </>
                  ) : ( */}
                  <div className="flex flex-col gap-6">
                    <div>
                      <div className="flex flex-row gap-4">
                        <div className="font-bold text-lg">Name:</div>
                        <div className="text-lg">{data?.data.name}</div>
                      </div>
                      <div className="flex flex-row gap-4">
                        <div className="font-bold text-lg">Email:</div>
                        <div className="text-lg">{data?.data.email}</div>
                      </div>
                    </div>
                    <div className="flex flex-row gap-8">
                      {data?.data.provider === "" && (
                        <>
                          <button
                            className="rounded-lg hover:opacity-80 hover:bg-black hover:text-white hover:border-none transition w-[100px] p-2 border-black border-2"
                            onClick={() => editUser.onOpen(data?.data)}
                          >
                            Edit
                          </button>
                          <button
                            className="rounded-lg hover:opacity-80 hover:bg-black hover:text-white hover:border-none transition w-[200px] p-2 border-black border-2"
                            onClick={() => router.push("/email/forgot")}
                          >
                            Change password
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                  {/* )} */}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-10 col-span-2 max-md:px-5">
            <h1 className="font-bold text-4xl">User Profile</h1>

            <div className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
              {/* change to table like display later*/}
              <div className="text-xl text-left flex flex-row gap-4">
                <IoPersonOutline size={30} className="ml-2" />
                <span>Name: {data?.data.name}</span>
              </div>
              <div className="text-xl text-left flex flex-row gap-4">
                <PiGlobeStand className="ml-2" size={30} />
                <span>Address: {data?.data.address}</span>
              </div>
              <div className="text-xl text-left flex flex-row gap-4">
                <FiPhone className="ml-2" size={30} />
                <span>Phone number: {data?.data.phone_number}</span>
              </div>
              <div className="text-xl text-left flex flex-row gap-4">
                <HiOutlineMail className="ml-2" size={30} />
                <span>Email: {data?.data.email}</span>
              </div>
            </div>
            <Separator />
            <h1 className="font-bold text-4xl">Order History</h1>
            <div>
              <UserClient Cart={data?.data.Cart} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
