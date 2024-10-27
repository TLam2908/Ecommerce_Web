"use client";

import Heading from "@/components/ui/heading";
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

import { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { BillboardSchema } from "@/interface/billboard";

import { getBillBoardById, addBillboard, updateBillboard } from "@/lib/authApi";
import toast from "react-hot-toast";
import { ImSpinner8 } from "react-icons/im";

const BillboardsForm = () => {
  const params = useParams();
  const router = useRouter();

  let title = "";
  let description = "";
  let toastMessage = "";
  let action = "";
  if (params.billboardId === "new") {
    title = "Create a billboard";
    description = "Add new billboard to the system";
    toastMessage = "Billboard added successfully";
    action = "Create";
  } else {
    title = "Edit a billboard";
    description = "Edit an existing billboard";
    toastMessage = "Billboard updated successfully";
    action = "Save changes";
  }

  const { data, isPending } = useQuery({
    queryKey: ["billboards", params.billboardId],
    queryFn: () => getBillBoardById(params.billboardId[0]),
    enabled: params.billboardId !== "new",
  });

  const {
    mutate: add,
    isError: isAddError,
    isPending: isAddPending,
  } = useMutation({
    mutationFn: addBillboard,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      router.replace("/admin/billboards");
      toast.success(toastMessage);
    },
  });

  const {
    mutate: update,
    isError: isUpdateError,
    isPending: isUpdatePending,
  } = useMutation({
    mutationFn: updateBillboard,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      router.replace("/admin/billboards");
      toast.success(toastMessage);
    },
  });

  const [imageSrc, setImageSrc] = useState<string | null>(null); // State to manage the uploaded image

  const form = useForm({
    resolver: zodResolver(BillboardSchema),
    defaultValues: {
      title: "",
      image_src: "",
    },
  });

  useEffect(() => {
    if (data?.data) {
      form.reset({
        title: data?.data?.title,
      });
      setImageSrc(data?.data?.image_src); // Set the image if it exists
    }
  }, [data, form]);

  const onSubmit = (data: z.infer<typeof BillboardSchema>) => {
    if (params.billboardId === "new") {
      add({ ...data, image_src: imageSrc || "" }); // Add new billboard
    } else {
      update({ ...data, image_src: imageSrc || "", id: params.billboardId[0] }); // Update existing billboard
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
            onSubmit={form.handleSubmit(onSubmit)} // Call handleSubmit with onSubmit
            className="space-y-8 w-full"
          >
            <div className="flex flex-col gap-5 w-[500px]">
              {/* Title Field */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xl font-semibold">
                      Title
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isAddPending || isUpdatePending}
                        placeholder="Billboard title"
                        className="focus:border border-black"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Image Upload Field */}
              <FormField
                control={form.control}
                name="image_src"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xl font-semibold">Image</FormLabel>
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

export default BillboardsForm;
