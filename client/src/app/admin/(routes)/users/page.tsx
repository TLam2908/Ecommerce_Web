import UsersClient from "@/components/admin/users/UsersClient"

const UsersPage = () => {
    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6 h-full bg-white">
                <UsersClient />
            </div>
        </div>
    )
}

export default UsersPage