"use client"
import { Model, Manufacturer } from "../../../types";
import { MultiSelect } from "../ui/multi-select";
import { Button } from "../ui/button";
import Filter from "./Filter";

import { Plus, X } from "lucide-react";
import { Dialog } from "@headlessui/react";
import IconButton from "./IconButton";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";


interface MobileFillterProps {
    manuData: Manufacturer[];
    modelData: Model[];
}

const MobileFillter: React.FC<MobileFillterProps> = ({modelData, manuData}) => {
    

    const [isOpen, setIsOpen] = useState(false)
    const onOpen = () => setIsOpen(true)
    const onClose = () => setIsOpen(false)

    return (
        <>
            <Button onClick={onOpen} className="flex items-center gap-x-2 lg:hidden">
                Filters
                <Plus size={20} color="white"/>
            </Button>

            <Dialog open={isOpen} as="div" className="relative z-40 lg:hidden" onClose={onClose}>
                {/* Background */}
                <div className="fixed inset-0 bg-black bg-opacity-25"/>
                
                {/* Dialog position */}
                <div className="fixed inset-0 z-40 flex">
                    <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white pb-6 shadow-xl">

                        {/* Close button */}
                        <div className="flex items-center justify-end px-4 py-2">
                            <IconButton icon={<X size={15} color="black"/>} onClick={onClose}/>
                        </div>

                        <div className="text-black p-4">
                            <Filter manuData={manuData} modelData={modelData}/>
                        </div>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </>
    )
}

export default MobileFillter