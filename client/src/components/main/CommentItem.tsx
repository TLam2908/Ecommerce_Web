"use client";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { AlertModal } from "@/components/modals/alert-modal";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

import { deleteComment } from "@/lib/authApi";

import { Comment as CommentType } from "../../../types";
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import useEditCommentModal from "@/hook/useEditCommentModal";
import useAuth from "@/hook/useAuth";
import { formatDistanceToNow } from "date-fns";
import { enUS } from "date-fns/locale";
import toast from "react-hot-toast";
import { queryClient } from "@/config/QueryWrapper";

interface CommentItemProps {
  data: CommentType;
}

const CommentItem: React.FC<CommentItemProps> = ({ data }) => {
  const { user } = useAuth();
  const editComment = useEditCommentModal();
  const [open, setOpen] = useState(false);

  const createdAt = new Date(data.createdAt);
  const timeAgo = formatDistanceToNow(createdAt, {
    addSuffix: true,
    locale: enUS,
  });

  // Hàm để hiển thị sao dựa trên rating
  const renderRating = (rating: number) => {
    const fullStars = Math.floor(rating); // Số sao đầy
    const halfStar = rating % 1 !== 0; // Kiểm tra xem có sao nửa không
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0); // Số sao trống

    return (
      <div className="flex items-center">
        {Array(fullStars)
          .fill(<FaStar className="text-yellow-400" />)
          .map((star, index) => (
            <span key={`full-${index}`}>{star}</span>
          ))}

        {halfStar && <FaStarHalfAlt className="text-yellow-400" />}

        {Array(emptyStars)
          .fill(<FaRegStar className="text-yellow-400" />)
          .map((star, index) => (
            <span key={`empty-${index}`}>{star}</span>
          ))}
      </div>
    );
  };

  const { mutate: deleteId, isPending } = useMutation({
    mutationFn: deleteComment,
    onError: () => {
      toast.error("An error occurred while deleting the comment");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
      setOpen(false);
      toast.success("Comment deleted successfully");
    },
  });

  return (
    <div className="flex flex-row justify-between">
      <div className="flex items-start gap-4">
        <Avatar className="h-12 w-12 border">
          <AvatarImage src={data.User.image_src} alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="grid gap-1.5">
          <div className="flex items-center gap-2">
            <div className="font-medium">{data.User.name}</div>
            <div className="text-sm text-muted-foreground">{timeAgo}</div>
          </div>
          <div className="text-md text-muted-foreground">{data.text}</div>

          {/* Hiển thị sao theo rating */}
          <div className="mt-1">{renderRating(data.rating)}</div>
        </div>
      </div>
      {user?.data.id === data.User.id && (
        <div>
          <AlertModal
            isOpen={open}
            onClose={() => setOpen(false)}
            onConfirm={() => deleteId(data.id)}
            loading={isPending}
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => {
                  editComment.onOpen(data);
                }}
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit
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
        </div>
      )}
    </div>
  );
};

export default CommentItem;
