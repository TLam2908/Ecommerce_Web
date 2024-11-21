import { create } from "zustand";
import { Product as ProductType } from "../../types";

interface PreviewModalStore {
    isOpen: boolean;
    data?: ProductType;
    onOpen: (data: ProductType) => void;
    onClose: () => void;
}

const usePreviewModal = create<PreviewModalStore>((set) => ({
    isOpen: true,
    data: undefined,
    onOpen: (data) => set({isOpen: true, data}),
    onClose: () => set({isOpen: false})
}))

export default usePreviewModal