"use client"

import usePreviewModal from "@/hook/usePreviewModal"

import Modal from "./modal"
import Gallery from "../main/gallery"
import Info from "../main/Info"

const PreviewModal = () => {
    const previewModal = usePreviewModal()
    const product = previewModal.data

    if (!product) return null

    return (
        <Modal open={previewModal.isOpen} onClose={previewModal.onClose}>
            <div className="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                <div className="sm:col-span-4 lg:col-span-5">
                    <Gallery images={product.Images.map((img, index) => ({ ...img, id: img.id || index.toString() }))}/>
                </div>
                <div className="sm:col-span-8 lg:col-span-7 text-gray-600">
                    <Info data={product}/>
                </div>
            </div>
        </Modal>
    )
}

export default PreviewModal