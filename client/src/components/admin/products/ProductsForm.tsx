"use client";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import MultiUpload from "@/components/MultiUpload";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useEffect, useState } from "react";
import { z } from "zod";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createAutopart,
  updateAutopart,
  getAutopartById,
  getCategories,
  getManufacturers,
  getModels,
} from "@/lib/authApi";
import { MultiSelect } from "@/components/ui/multi-select";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductSchema } from "@/interface/product";
import { ImSpinner8 } from "react-icons/im";

const ProductForm = () => {
  const params = useParams();
  const router = useRouter();

  const [imageSrc, setImageSrc] = useState<string[]>([]);
  const [model, setModel] = useState<string[]>([]);

  let title = "";
  let description = "";
  let toastMessage = "";
  let action = "";

  if (params.productId !== "new") {
    title = "Edit Product";
    description = "Update product preferences";
    toastMessage = "Product updated successfully";
    action = "Save changes";
  } else {
    title = "Create Product";
    description = "Add a new product";
    toastMessage = "Product created successfully";
    action = "Create";
  }

  const productId = Array.isArray(params.productId) ? params.productId[0] : params.productId;

  const { data, isPending } = useQuery({
    queryKey: ["products", productId],
    queryFn: () => getAutopartById(productId),
    enabled: productId !== "new",
  });

  console.log(data);

  const { data: categoryData, isPending: categoryPending } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });

  const { data: manufacturerData, isPending: manufacturerPending } = useQuery({
    queryKey: ["manufacturers"],
    queryFn: () => getManufacturers(),
  });

  const { data: modelData, isPending: modelPending } = useQuery({
    queryKey: ["models"],
    queryFn: () => getModels(),
  });

  const formatModel = modelData?.data?.map(
    (model: { name: string; id: string, year: string }) => ({
      value: model.id.toString(),
      label: model.name + ' (' + model.year + ')',
    })
  );

  const {
    mutate: add,
    isError: isAddError,
    isPending: isAddPending,
  } = useMutation({
    mutationFn: createAutopart,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      router.replace("/admin/products");
      toast.success(toastMessage);
    },
  });

  const {
    mutate: update,
    isError: isUpdateError,
    isPending: isUpdatePending,
  } = useMutation({
    mutationFn: updateAutopart,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      router.replace("/admin/products");
      toast.success(toastMessage);
    },
  });

  const form = useForm<z.infer<typeof ProductSchema>>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      oem_number: "",
      quantity: "",
      category_name: "",
      manufacturer_name: "",
      model_id: [],
      images: [],
    },
  });

  useEffect(() => {
    if (data?.data) {
      form.reset({
        name: data?.data.name,
        description: data?.data.description,
        price: data?.data.price.toString(),
        oem_number: data?.data.oem_number,
        quantity: data?.data.quantity.toString(),
        category_name: data?.data.Category.name,
        manufacturer_name: data?.data.Manufacturer.name,
        model_id: data?.data.Autopart_Model.map(
          (model: { Model: { id: number } }) => model.Model.id.toString()
        ),
        images: data?.data.Images.map((image: { src: string }) => image.src),
      });
      // setImageSrc(data?.data.images);
    }
  }, [data, form]);

  const handleImageChange = (newImages: string[]) => {
    setImageSrc(newImages);
    form.setValue("images", newImages);
  };

  const handleImageRemove = (index: number) => {
    const updatedImages = imageSrc.filter((_, i) => i !== index);
    setImageSrc(updatedImages);
    form.setValue("images", updatedImages);
  };

  const onSubmit = (data: z.infer<typeof ProductSchema>) => {
    console.log(data);
    if (productId === "new") {
      add(data);
    } else {
      update({ ...data, id: productId });
      console.log(data);
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
            className="space-y-8 w-full"
            onSubmit={form.handleSubmit(onSubmit)}
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
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold">
                        Description
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter description"
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
                  name="oem_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold">
                        OEM Number
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter OEM Number"
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
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold">
                        Price
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter price"
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
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold">
                        Quantity
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter quantity"
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
                  name="category_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold">
                        Category
                      </FormLabel>
                      <Select
                        disabled={categoryPending}
                        onValueChange={(value) => {
                          field.onChange(value);
                          console.log(field);
                        }}
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              defaultValue={field.value}
                              placeholder="Select a Category"
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categoryData?.data?.map(
                            (cate: { id: string; name: string }) => (
                              <SelectItem key={cate.id} value={cate.name}>
                                {cate.name}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="manufacturer_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold">
                        Manufacturer
                      </FormLabel>
                      <Select
                        disabled={categoryPending}
                        onValueChange={(value) => {
                          field.onChange(value);
                          console.log(field);
                        }}
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              defaultValue={field.value}
                              placeholder="Select a Manufacturer"
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {manufacturerData?.data?.map(
                            (manu: { id: string; name: string }) => (
                              <SelectItem key={manu.id} value={manu.name}>
                                {manu.name}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {formatModel && (
                  <FormField
                    control={form.control}
                    name="model_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg font-semibold">
                          Models
                        </FormLabel>
                        <MultiSelect
                          options={formatModel}
                          value={field.value}
                          onValueChange={(value) => {
                            field.onChange(value);
                            console.log(field.value);
                          }}
                          placeholder="Select models"
                          variant="inverted"
                          animation={2}
                          maxCount={5}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>
            </div>
            <div className="w-[500px]">
              <FormField
                control={form.control}
                name="images"
                render={({ field }) => (
                  <MultiUpload value={field.value} onChange={field.onChange}  />
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

export default ProductForm;
