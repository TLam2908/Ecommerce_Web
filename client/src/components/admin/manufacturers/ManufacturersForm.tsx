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
import { TypeOf, z } from "zod";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ManufacturerSchema } from "@/interface/manufaturer";

import {
  getManufacturerById,
  updateManufacturer,
  createManufacturer,
} from "@/lib/authApi";
import toast from "react-hot-toast";
import { ImSpinner8 } from "react-icons/im";

const ManufacturersForm = () => {
  const params = useParams();
  const router = useRouter();

  let title = "";
  let description = "";
  let toastMessage = "";
  let action = "";
  if (params.manufacturerId === "new") {
    title = "Create a manufacturer";
    description = "Add new manufacturer to the system";
    toastMessage = "Manufacturer added successfully";
    action = "Create";
  } else {
    title = "Edit a manufacturer";
    description = "Edit an existing manufacturer";
    toastMessage = "Manufacturer updated successfully";
    action = "Save changes";
  }

  const { data, isPending } = useQuery({
    queryKey: ["manufacturers", params.manufacturerId],
    queryFn: () => getManufacturerById(params.manufacturerId[0]),
    enabled: params.manufacturerId !== "new",
  });

  const {
    mutate: add,
    isError: isAddError,
    isPending: isAddPending,
  } = useMutation({
    mutationFn: createManufacturer,
    onSuccess: () => {
      router.replace("/admin/manufacturers");
      toast.success(toastMessage);
    },
  });

  const {
    mutate: update,
    isError: isUpdateError,
    isPending: isUpdatePending,
  } = useMutation({
    mutationFn: updateManufacturer,
    onSuccess: () => {
      router.replace("/admin/manufacturers");
      toast.success(toastMessage);
    },
  });

  const form = useForm({
    resolver: zodResolver(ManufacturerSchema),
    defaultValues: {
      name: "",
      country: "",
      type_of_product: "",
      abbreviation: "",
    },
  });

  useEffect(() => {
    if (data?.data) {
      form.reset({
        name: data.data.name,
        country: data.data.country,
        type_of_product: data.data.type_of_product,
        abbreviation: data.data.abbreviation,
      });
    }
  }, [data, form]);

  const onsubmit = (data: z.infer<typeof ManufacturerSchema>) => {
    if (params.manufacturerId === "new") {
      add(data);
    } else {
      update({ id: params.manufacturerId[0], ...data });
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
          <form onSubmit={form.handleSubmit(onsubmit)} className="space-y-8 w-full">
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
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold">
                        Country
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Country"
                          className="focus:border border-black"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage></FormMessage>
                    </FormItem>
                  )}
                ></FormField>
              </div>
              <div className="flex flex-col gap-5 w-[500px]">
                <FormField
                  control={form.control}
                  name="type_of_product"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold">
                        Type of Product
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Type of Product"
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
                  name="abbreviation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold">
                        Abbreviation
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Abbreviation"
                          className="focus:border border-black"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage></FormMessage>
                    </FormItem>
                  )}
                ></FormField>
              </div>
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

export default ManufacturersForm;
