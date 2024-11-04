"use client";
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
import Heading from "@/components/ui/heading";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import ImageUpload from "@/components/ImageUpload";

import { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { UserSchema, UserEditSchema } from "@/interface/user";
import { getUserById, addUser, updateUser } from "@/lib/authApi";
import toast from "react-hot-toast";
import { ImSpinner8 } from "react-icons/im";

const UserForm = () => {
  const params = useParams();
  const router = useRouter();

  const [imageSrc, setImageSrc] = useState<string | null>(null); // State to manage the uploaded image
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  let title = "";
  let description = "";
  let toastMessage = "";
  let action = "";
  let edit = false;
  if (params.userId === "new") {
    title = "Create a user";
    description = "Add new user to the system";
    toastMessage = "User added successfully";
    action = "Create";
    edit = false;
  } else {
    title = "Edit a user";
    description = "Edit an existing user";
    toastMessage = "User updated successfully";
    action = "Save changes";
    edit = true;
  }

  const { data, isPending } = useQuery({
    queryKey: ["users", params.userId],
    queryFn: () => getUserById(params.userId[0]),
    enabled: params.userId !== "new",
  });

  const {
    mutate: add,
    isError: isAddError,
    isPending: isAddPending,
  } = useMutation({
    mutationFn: addUser,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      router.replace("/admin/users");
      toast.success(toastMessage);
    },
  });

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
      router.replace("/admin/users");
      toast.success(toastMessage);
    },
  });

  const form = useForm({
    resolver: zodResolver(edit ? UserEditSchema : UserSchema),
    defaultValues: {
      name: "",
      email: "",
      password: edit ? "" : "",
      confirmPassword: edit ? "" : "",
      address: "",
      phone_number: "",
      image_src: "",
    },
  });

  useEffect(() => {
    if (data?.data) {
      form.reset({
        name: data?.data?.name,
        email: data?.data?.email,
        address: data?.data?.address || "",
        phone_number: data?.data?.phone_number || "",
      });
      setImageSrc(data?.data?.image_src); // Set the image if it exists
    }
  }, [data, form]);

  const onSubmit = (data: z.infer<typeof UserSchema>) => {
    console.log(data);
    if (params.userId === "new") {
      add({
        ...data,
        address: data.address || "",
        phone_number: data.phone_number || "",
        image_src: data.image_src || "",
      });
    } else {
      update({
        ...data,
        id: params.userId[0],
        address: data.address || "",
        phone_number: data.phone_number || "",
        image_src: data.image_src || "",
      });
    }
  };

  return (
    <>
      <div className="flex items-center justify-between p-8 pt-6">
        <Heading title={title} description={description} />
      </div>
      <Separator />
      <div className="p-8 bg-white">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-full"
          >
            <div className="flex flex-row gap-[200px] w-full max-md:flex-col max-md:gap-5">
              <div className="flex flex-col gap-5 w-[500px]">
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
                  name="phone_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold">
                        Phone number (Optional)
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Phone number"
                          className="focus:border border-black pr-10" // Add padding to make space for the icon
                          {...field}
                        />
                      </FormControl>
                      <FormMessage></FormMessage>
                    </FormItem>
                  )}
                ></FormField>
                {!edit && (
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg font-semibold">
                          Password
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              placeholder="Password"
                              className="focus:border border-black"
                              type={showPassword ? "text" : "password"}
                              {...field}
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600"
                            >
                              {showPassword ? (
                                <FaRegEyeSlash size={20} />
                              ) : (
                                <FaRegEye size={20} />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage></FormMessage>
                      </FormItem>
                    )}
                  ></FormField>
                )}
              </div>
              <div className="flex flex-col gap-5 w-[500px]">
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
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold">
                        Address (Optional)
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
                {!edit && (
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg font-semibold">
                          Confirm password
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              placeholder="Confirm password"
                              className="focus:border border-black"
                              type={showConfirmPassword ? "text" : "password"}
                              {...field}
                            />
                            <button
                              type="button"
                              onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                              }
                              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600"
                            >
                              {showConfirmPassword ? (
                                <FaRegEyeSlash size={20} />
                              ) : (
                                <FaRegEye size={20} />
                              )}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage></FormMessage>
                      </FormItem>
                    )}
                  ></FormField>
                )}
              </div>
            </div>
            <div className="w-[500px]">
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
              disabled={isAddPending || isUpdatePending}
              className="ml-auto"
              type="submit"
            >
              {(isAddPending || isUpdatePending) && (
                <ImSpinner8 className="animate-spin mr-2 h-4 w-4" />
              )}
              {action}
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default UserForm;
