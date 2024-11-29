"use client"
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import { OrderColumn } from "./OrdersColumn";
import { AlertModal } from "@/components/modals/alert-modal";

import { deleteOrder } from "@/lib/authApi";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { queryClient } from "@/config/QueryWrapper";

interface CellActionProps {
  data: OrderColumn;
}

const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("ID copied to clipboard");
  };

  const {
    mutate: deleteId,
    isError,
    isPending,
  } = useMutation({
    mutationFn: deleteOrder,
    onError: () => {
      toast.error("An error occurred while deleting the order");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      setOpen(false);
      toast.success("Order deleted successfully");
    },
  });

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => deleteId(data.id)}
        loading={isPending}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost">
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => {
              onCopy(data.id);
            }}
          >
            <Copy className="mr-2 h-4 w-4" />
            Copy ID
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              router.push(`/admin/orders/${data.id}`);
            }}
          >
            <Edit className="mr-2 h-4 w-4" />
            View details order
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setOpen(true);
            }}
          >
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default CellAction;
