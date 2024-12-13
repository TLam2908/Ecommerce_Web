"use client"
import PreviewModal from "@/components/modals/preview-modal"
import EditUserModal from "@/components/modals/edit-user-modal"
import EditCommentModal from "@/components/modals/edit-comment-modal"
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
            <EditCommentModal/>
        </>
    )
}

export default ModalProvider