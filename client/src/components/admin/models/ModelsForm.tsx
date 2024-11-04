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

import { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ModelSchema } from "@/interface/model";
import { getModelById, createModel, updateModel } from "@/lib/authApi";
import toast from "react-hot-toast";
import { ImSpinner8 } from "react-icons/im";

const ModelsForm = () => {
  const params = useParams();
  const router = useRouter();

  let title = "";
  let description = "";
  let toastMessage = "";
  let action = "";
  if (params.modelId === "new") {
    title = "Create a model";
    description = "Add new model to the system";
    toastMessage = "Model added successfully";
    action = "Create";
  } else {
    title = "Edit a model";
    description = "Edit an existing model";
    toastMessage = "Model updated successfully";
    action = "Save changes";
  }

  const { data, isPending } = useQuery({
    queryKey: ["models", params.modelId],
    queryFn: () => getModelById(params.modelId[0]),
    enabled: params.modelId !== "new",
  });

  const {
    mutate: add,
    isError: isAddError,
    isPending: isAddPending,
  } = useMutation({
    mutationFn: createModel,
    onError: () => {
      toast.error("An error occurred while creating the model");
    },
    onSuccess: () => {
      toast.success(toastMessage);
      router.push("/admin/models");
    },
  });

  const {
    mutate: update,
    isError: isUpdateError,
    isPending: isUpdatePending,
  } = useMutation({
    mutationFn: updateModel,
    onError: () => {
      toast.error("An error occurred while updating the model");
    },
    onSuccess: () => {
      toast.success(toastMessage);
      router.push("/admin/models");
    },
  });

  const form = useForm({
    resolver: zodResolver(ModelSchema),
    defaultValues: {
      name: "",
      make: "",
      year: "",
    },
  });

  useEffect(() => {
    if (data?.data) {
      form.reset({
        name: data.data.name,
        make: data.data.make,
        year: data.data.year,
      });
    }
  }, [data, form]);

  const onSubmit = (data: z.infer<typeof ModelSchema>) => {
    if (params.modelId === "new") {
      add(data);
    } else {
      update({ id: params.modelId[0], ...data });
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
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
            <div className="flex flex-col w-[500px] gap-5">
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
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold">
                      Year
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
                name="make"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold">
                      Make
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

export default ModelsForm;