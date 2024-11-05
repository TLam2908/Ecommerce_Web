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
import { Button } from '@/components/ui/button';
import Heading from "@/components/ui/heading";
import ImageUpload from "@/components/ImageUpload";

import { use, useEffect, useState } from "react";
import { z } from "zod";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createAutopart, updateAutopart, getAutopartById } from "@/lib/authApi";
import toast from "react-hot-toast";
import { ImSpinner8 } from "react-icons/im";

const ProductForm = () => {
    const params = useParams();
    const router = useRouter();

    const [imageSrc, setImageSrc] = useState<string[]>([])
    const [model, setModel] = useState<string[]>([])

    let title = ""
    let description = ""
    let toastMessage = ""
    let action = ""

    if (params.productId !== "new") {
        title = "Edit Product"
        description = "Update product preferences"
        toastMessage = "Product updated successfully"
        action = "Save changes"
    } else {
        title = "Create Product"
        description = "Add a new product"
        toastMessage = "Product created successfully"
        action = "create"
    }
    const { data, isPending } = useQuery({
        queryKey: ["products", params.productId],
        queryFn: () => getAutopartById(params.productId[0]),
        enabled: params.productId !== "new",
    })
    
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
    })
}

export default ProductForm;