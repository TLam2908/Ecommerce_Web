"use client";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ImSpinner8 } from "react-icons/im";
import Modal from "./modal";
import { toast } from "react-hot-toast";

import { useEffect, useState } from "react";
import { queryClient } from "@/config/QueryWrapper";
import { useMutation } from "@tanstack/react-query";
import useEditCommentModal from "@/hook/useEditCommentModal";
import { updateComment } from "@/lib/authApi";
import { FaStar, FaRegStar } from "react-icons/fa"; // Add icons for stars

const EditCommentModal = () => {
  const editComment = useEditCommentModal();
  const [rating, setRating] = useState<number>(0); // Set the initial rating to the current rating
  const [text, setText] = useState<string>("");

  useEffect(() => {
    if (editComment.data) {
      setRating(editComment.data.rating || 0); // Set initial rating
      setText(editComment.data.text || ""); // Set initial text
    }
  }, [editComment.data]);

  const {
    mutate: update,
    isError: isUpdateError,
    isPending: isUpdatePending,
  } = useMutation({
    mutationFn: updateComment,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
      editComment.onClose();
      toast.success("Comment updated successfully");
    },
  });

  const handleStarClick = (star: number) => {
    setRating(star); // Update the rating when a star is clicked
  };

  const onSubmit = () => {
    console.log({
      id: editComment.data?.id || "",
      rating,
      text,
      user_id: editComment.data?.user_id || "",
      autopart_id: editComment.data?.autopart_id || "",
    });

    update({
      id: editComment.data?.id || "",
      rating,
      text,
      user_id: editComment.data?.user_id || "",
      autopart_id: editComment.data?.autopart_id || "",
    });
  };

  return (
    <Modal open={editComment.isOpen} onClose={editComment.onClose}>
      <div className="w-full text-black">
        <div className="pb-4">
          <h1 className="text-2xl font-semibold">Edit Comment</h1>
        </div>
        <div className="grid gap-2">
          {/* Rating stars */}
          <div className="flex space-x-1 items-center">
            <div className="text-md">Your Rating:</div>
            {[1, 2, 3, 4, 5].map((star) => (
              <div key={star} onClick={() => handleStarClick(star)}>
                {star <= rating ? (
                  <FaStar className="text-primary text-yellow-400" />
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
            {isUpdatePending && (
              <ImSpinner8 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Update
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default EditCommentModal;
