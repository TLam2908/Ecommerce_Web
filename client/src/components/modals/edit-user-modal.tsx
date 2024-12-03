"use client";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import ImageUpload from "@/components/ImageUpload";
import { ImSpinner8 } from "react-icons/im";
import Modal from "./modal";

import { zodResolver } from "@hookform/resolvers/zod";
import { queryClient } from "@/config/QueryWrapper";
import { useState, useEffect } from "react";
import { updateUser } from "@/lib/authApi";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import useEditUserModal from "@/hook/useEditUserModal";
import { UserEditSchema } from "@/interface/user";
const EditUserModal = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const editUser = useEditUserModal();
  const user = editUser.data;

  const {
    mutate: update,
    isError: isUpdateError,
    isPending: isUpdatePending,
  } = useMutation({
    mutationFn: updateUser,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userId"] });
      editUser.onClose();
      toast.success("User updated successfully");
    },
  });

  const form = useForm({
    resolver: zodResolver(UserEditSchema),
    defaultValues: {
      name: "",
      email: "",
      address: "",
      phone_number: "",
      image_src: "",
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name,
        email: user.email,
        address: user.address || "",
        phone_number: user.phone_number || "",
      });
      setImageSrc(user.image_src); // Set the image if it exists
    }
  }, [user, form]);

  const onSubmit = (data: z.infer<typeof UserEditSchema>) => {
    if (user) {
        console.log(data)
      update({
        id: user.id,
        ...data,
        address: data.address || "",
        phone_number: data.phone_number || "",
        image_src: data.image_src || "",
      });
    }
  };

  return (
    <Modal open={editUser.isOpen} onClose={editUser.onClose}>
      <div className="w-full text-black">
        <div className="pb-4">
          <h1 className="text-2xl font-semibold">Edit User information</h1>
        </div>
        <Separator />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-5 w-[400px] pt-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold">
                      Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Name"
                        className="focus:border border-black"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              ></FormField>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Email"
                        className="focus:border border-black"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              ></FormField>
              <FormField
                control={form.control}
                name="phone_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold">
                      Phone Number
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Phone Number"
                        className="focus:border border-black"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              ></FormField>
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold">
                      Address
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Address"
                        className="focus:border border-black"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage></FormMessage>
                  </FormItem>
                )}
              ></FormField>
            </div>
            <div className="w-[300px] py-4">
              <FormField
                control={form.control}
                name="image_src"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold">
                      Image
                    </FormLabel>
                    <FormControl>
                      <ImageUpload
                        value={field.value || imageSrc || ""} // Use field value or fallback to imageSrc or empty string
                        onChange={(image) => {
                          field.onChange(image); // Update form value
                          setImageSrc(image); // Update component state if needed
                        }}
                        onRemove={() => {
                          field.onChange(null); // Remove image from form state
                          setImageSrc(null); // Update component state
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              disabled={isUpdatePending}
              className="ml-auto"
              type="submit"
            >
              {isUpdatePending && (
                <ImSpinner8 className="animate-spin mr-2 h-4 w-4" />
              )}
              Save changes
            </Button>
          </form>
        </Form>
      </div>
    </Modal>
  );
};

export default EditUserModal;
