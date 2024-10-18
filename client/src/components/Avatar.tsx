import avatar from '@/assets/landingPage/placeholder.jpg'
import Image from 'next/image';

const Avatar = () => {
  return (
    <Image
      alt="Logo"
      height={40}
      width={40}
      src={avatar}
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
