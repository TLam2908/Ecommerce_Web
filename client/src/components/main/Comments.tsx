"use client";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import CommentItem from "./CommentItem";

import { Comment as CommentType } from "../../../types";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useState } from "react"; // Import useState for managing the rating state
import useAuth from "@/hook/useAuth";

import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { ImSpinner8 } from "react-icons/im";

import { getCommentsByAutopart, addComment } from "@/lib/authApi";
import toast from "react-hot-toast";
import { queryClient } from "@/config/QueryWrapper";

export default function Comments() {
  const { user } = useAuth();
  const { productId } = useParams();
  const autopart_id = Array.isArray(productId) ? productId[0] : productId;

  const { data, isPending } = useQuery({
    queryKey: ["comments", autopart_id],
    queryFn: () => getCommentsByAutopart(autopart_id),
  });

  const {
    mutate: add,
    isError: isAddingError,
    isPending: isAddingPending,
  } = useMutation({
    mutationFn: addComment,
    onError: (error) => {
      toast.error("Failed to add comment");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", autopart_id] });
      toast.success("Comment added successfully");
    },
  });

  // State for rating
  const [rating, setRating] = useState<number>(0);
  const [text, setText] = useState<string>("");

  const handleStarClick = (index: number) => {
    setRating(index);
  };

  const onSubmit = () => {
    add({
      rating,
      text,
      autopart_id,
      user_id: user?.data.id,
    });
    setRating(0);
    setText("");
  };

  return (
    <div className="flex flex-col max-w-2xl space-y-8 py-8">
      <div className="space-y-4">
        <h3 className="text-3xl font-bold">Comments</h3>
        <div className="grid gap-2">
          {/* Rating stars */}
          <div className="flex space-x-1 items-center">
            <div className="text-md">Your Rating:</div>
            {[1, 2, 3, 4, 5].map((star) => (
              <div key={star} onClick={() => handleStarClick(star)}>
                {star <= rating ? (
                  <FaStar className="text-primary text-yellow-400"/>
                ) : (
                  <FaRegStar className="text-primary text-yellow-400" />
                )}
              </div>
            ))}
          </div>

          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write your comment..."
            className="resize-none rounded-md border border-input bg-background p-3 text-md shadow-sm"
          />

          <Button className="justify-center" onClick={onSubmit}>
          {isPending && (
              <ImSpinner8 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Submit
          </Button>
        </div>
      </div>
      <div className="space-y-6">
        {data?.data.map((comment: CommentType) => (
          <CommentItem key={comment.id} data={comment} />
        ))}
      </div>
    </div>
  );
}
