"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Heading from "@/components/ui/heading";
import { Plus } from "lucide-react";

import { format } from "date-fns";
import { UserColumn, columns } from "./UsersColumn";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "@/lib/authApi";
import { DataTable } from "@/components/ui/data-table";

interface UsersClientProps {
    id: string;
    name: string;
    email: string;
    phone_number: string;
    address: string;
    role: string;
    image: string;
    verified: string;
    createdAt: string;
}

const UsersClient = () => {
  const router = useRouter();
  const { data, isPending } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(),
  });

    console.log(data);


  const formatedUsers: UserColumn[] = data?.data?.map((user: UsersClientProps) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    phone_number: user.phone_number,
    address: user.address,
    role: user.role,
    image: user.image,
    verified: user.verified,
    createdAt: format(user.createdAt, "MMMM dd, yyyy"),
  })) || []


  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`User${formatedUsers.length === 1 ? '' : 's'} (${formatedUsers.length})`}
          description="Manage user preferences"
        />
        <Button
          onClick={() => {
            router.push("/admin/users/new");
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add new
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={formatedUsers} searchKey="name"/>
    </>
  );
};

export default UsersClient;
