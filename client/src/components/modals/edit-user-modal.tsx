"use client"

import Modal from "./modal"
import useEditUserModal from "@/hook/useEditUserModal"

const EditUserModal = () => {
    const editUser = useEditUserModal()
    return (
        <Modal open={editUser.isOpen} onClose={editUser.onClose}>
            <div>Edit</div>
        </Modal>
    )
}

export default EditUserModal