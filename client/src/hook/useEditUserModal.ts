import { create } from "zustand";
import { User } from "../../types";

interface EditUserModelStore {
    isOpen: boolean;
    data?: User;
    onOpen: (data: User) => void;
    onClose: () => void;
}

const useEditUserModal = create<EditUserModelStore>((set) => ({
    isOpen: false,
    data: undefined,
    onOpen: (data) => set({isOpen: true, data}),
    onClose: () => set({isOpen: false})
}))

export default useEditUserModal