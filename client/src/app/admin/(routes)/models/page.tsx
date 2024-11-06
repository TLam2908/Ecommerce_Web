import ModelsClient from "@/components/admin/models/ModelsClient";

const ModelsPage = () => {
    return (
        <div className="flex-col bg-white">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ModelsClient />
            </div>
        </div>
    )
}

export default ModelsPage