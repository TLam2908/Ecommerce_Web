"use client";

import MenuItem from "./MenuItem";

import { logout } from "@/lib/authApi";
import useAuth from "@/hook/useAuth";
import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import Avatar from "../Avatar";

const UserMenu = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const { user } = useAuth();

  const logoutHandler = () => {
    logout()
    router.replace("/")
  }
  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer w-32"
        >
        </div>
        <div
          onClick={toggleOpen}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
            <Avatar/>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            <MenuItem label="User Profile" onClick={() => router.push(`/main/user/${user?.data.id}`)} />
            <MenuItem label="Logout" onClick={logoutHandler} />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
