"use client"

import avatar from '@/assets/landingPage/placeholder.jpg'
import Image from 'next/image';
import { useEffect, useState } from 'react';
import useAuth from '@/hook/useAuth';

const Avatar = () => {

  const user = useAuth();
  const userAvatar = user?.user?.data?.image_src;

  return (
    <Image
      alt="Logo"
      height={40}
      width={40}
      src={userAvatar || avatar}
      className="
            rounded-full
            hidden 
            md:block 
            cursor-pointer
            w-[40px] h-[40px]"
    />
  );
};

export default Avatar;
