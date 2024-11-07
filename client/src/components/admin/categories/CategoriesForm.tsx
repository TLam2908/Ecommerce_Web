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
import { CategorySchema } from "@/interface/category";

import {
  getCategoryById,
  createCategory,
  updateCategory,
  getBillboards,
} from "@/lib/authApi";
import toast from "react-hot-toast";
import { ImSpinner8 } from "react-icons/im";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CategoriesForm = () => {
  const params = useParams();
  const router = useRouter();

  let title = "";
  let description = "";
  let toastMessage = "";
  let action = "";

  if (params.categoryId === "new") {
    title = "Create a category";
    description = "Add new category to the system";
    toastMessage = "Category added successfully";
    action = "Create";
  } else {
    title = "Edit a category";
    description = "Edit an existing category";
    toastMessage = "Category updated successfully";
    action = "Save changes";
  }

  const categoryId = Array.isArray(params.categoryId) ? params.categoryId[0] : params.categoryId;

  const { data: categoryData, isPending: categoryPending } = useQuery({
    queryKey: ["categories", categoryId],
    queryFn: () => getCategoryById(categoryId[0]),
    enabled: categoryId !== "new",
  });

  console.log(categoryData)

  const { data: billboardData, isPending: billboardPending } = useQuery({
    queryKey: ["billboards"],
    queryFn: () => getBillboards(),
  });


  const {
    mutate: add,
    isError: isAddError,
    isPending: isAddPending,
  } = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      router.replace("/admin/categories");
      toast.success(toastMessage);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const {
    mutate: update,
    isError: isUpdateError,
    isPending: isUpdatePending,
  } = useMutation({
    mutationFn: updateCategory,
    onSuccess: () => {
      router.replace("/admin/categories");
      toast.success(toastMessage);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const form = useForm<z.infer<typeof CategorySchema>>({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      name: "",
      description: "",
      code: "",
      billboard_title: "",
    },
  });

  useEffect(() => {
    if (categoryData?.data) {
      form.reset({
        name: categoryData?.data?.category?.name,
        description: categoryData?.data?.category?.description,
        code: categoryData?.data?.category?.code,
        billboard_title: categoryData?.data?.category?.Billboard?.title, 
      });
    }
  }, [categoryData, form]);

  const onSubmit = (data: z.infer<typeof CategorySchema>) => {
    if (categoryId === "new") {
      add(data);
    } else {
      console.log(data);
      update({ ...data, id: categoryId });
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
                          disabled={isAddPending || isUpdatePending}
                          placeholder="Category Name"
                          className="focus:border border-black"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold">
                        Description
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={isAddPending || isUpdatePending}
                          placeholder="Category Description"
                          className="focus:border border-black"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col gap-5 w-[500px]">
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold">
                        Code
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={isAddPending || isUpdatePending}
                          placeholder="Category Code"
                          className="focus:border border-black"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="billboard_title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold">Billboard</FormLabel>
                      <Select
                        disabled={billboardPending}
                        onValueChange={(value) => {
                          field.onChange(value);
                          console.log(field)
                        }}
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              defaultValue={field.value}
                              placeholder="Select a billboard"
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {
                            billboardData?.data?.map((billboard: { id: string; title: string }) => (
                              <SelectItem
                                key={billboard.id}
                                value={billboard.title}
                              >
                                {billboard.title}
                              </SelectItem>
                            ))
                          }
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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

export default CategoriesForm;
