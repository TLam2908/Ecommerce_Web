// Desc: UserClient component for user orders history
import { Cart as CartType } from "../../../../types";
import { format } from "date-fns";
import { UserColumn, columns } from '@/components/main/user/UserColumn'
import { DataTable } from "@/components/ui/data-table";

interface UserClientProps {
  Cart: CartType[]
}

const UserClient: React.FC<UserClientProps> = ({ Cart }) => {
  console.log(Cart);
 

  const formatedUser: UserColumn[] =
    Cart?.map((order) => ({
      id: order.id,
      total: order.total,
      isPaid: order.isPaid,
      createdAt: format(new Date(order.createdAt), "MMMM dd, yyyy"),
    })) || [];

  return (
    <>
      <DataTable columns={columns} data={formatedUser} searchKey="id" />
    </>
  );
};

export default UserClient;
