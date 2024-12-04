
import Image from 'next/image';

import Logo from '@/assets/landingPage/logosaas.png'
import MainNav from "./MainNav";
import UserMenu from './main/UserMenu';

const Navbar = () => {
    return (
        <div className="border-b">
            <div className="flex h-16 items-center px-4">
                <div className="font-semibold flex flex-row items-center gap-4">
                    <Image src={Logo} width={30} height={30} alt="logo" />
                    AutoPart
                </div>
                <MainNav className="mx-6"/>
                <div className="ml-auto flex items-center space-x-4">
                    <UserMenu/>
                </div>
            </div>
        </div>
    )
}

export default Navbar