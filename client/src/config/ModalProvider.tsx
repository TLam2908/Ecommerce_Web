"use client"
import PreviewModal from "@/components/modals/preview-modal"
import EditUserModal from "@/components/modals/edit-user-modal"
import { useEffect, useState } from "react"

const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false)
    useEffect(() => {
        setIsMounted(true)
    }, [])

    if(!isMounted) return null

    return (
        <>
            <PreviewModal/>
            <EditUserModal/>
        </>
    )
}

export default ModalProvider