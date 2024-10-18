"use client";

import Heading from "@/components/ui/heading";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { useParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { BillboardSchema } from "@/interface/billboard";

import { getBillBoardById, addBillboard } from "@/lib/authApi";

const BillboardsForm = () => {
  const params = useParams();
  console.log(params.billboardId);

  let title = "";
  let description = "";
  if (params.billboardId === "new") {
    title = "Create a billboard";
    description = "Add new billboard to the system";
  } else {
    title = "Edit a billboard";
    description = "Edit an existing billboard";
  }

  const { data } = useQuery({
    queryKey: ["billboards", params.billboardId],
    queryFn: () => getBillBoardById(params.billboardId[0]),
    enabled: params.billboardId !== "new"
  })

  const {
    mutate: add,
    isError,
    isPending,
  } = useMutation({
    mutationFn: addBillboard,
  });

  const form = useForm({
    resolver: zodResolver(BillboardSchema),
    defaultValues: {
      title: "",
      image_src: "",
    },
  });

  const onSubmit = (data: z.infer<typeof BillboardSchema>) => {
    console.log(data);
  };

  return (
    <>
      <section className="flex items-center justify-between">
        <Heading title={title} description={description}></Heading>
      </section>
    </>
  );
};

export default BillboardsForm;
