import { create } from "zustand";
import { Comment } from "../../types";

interface EditCommentModelStore {
    isOpen: boolean;
    data?: Comment;
    onOpen: (data: Comment) => void;
    onClose: () => void;
}

const useEditCommentModal = create<EditCommentModelStore>((set) => ({
    isOpen: false,
    data: undefined,
    onOpen: (data) => set({isOpen: true, data}),
    onClose: () => set({isOpen: false})
}))

export default useEditCommentModal