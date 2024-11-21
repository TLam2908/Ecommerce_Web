"use client";
import qs from "query-string";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { Model, Manufacturer } from "../../../types";
import { MultiSelect } from "../ui/multi-select";
import { Button } from "../ui/button";

interface FilterProps {
  manuData: Manufacturer[];
  modelData: Model[];
}

const Filter: React.FC<FilterProps> = ({ manuData, modelData }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Separate state for each MultiSelect
  const [selectedManufacturers, setSelectedManufacturers] = useState<string[]>(
    searchParams.getAll("manufacturerId") || []
  );
  const [selectedModels, setSelectedModels] = useState<string[]>(
    searchParams.getAll("modelId") || []
  );
  const [searchInput, setSearchInput] = useState("");

  const applyFilters = () => {
    const current = qs.parse(searchParams.toString());
    const query = {
      ...current,
      manufacturerId:
        selectedManufacturers.length > 0 ? selectedManufacturers : null,
      modelId: selectedModels.length > 0 ? selectedModels : null,
      search: searchInput || null,
    };

    const url = qs.stringifyUrl(
      {
        url: window.location.href.split("?")[0],
        query,
      },
      { skipNull: true, arrayFormat: "none" }
    );

    router.push(url);
  };

  const onClear = () => {
    setSelectedManufacturers([]); // Clear manufacturers
    setSelectedModels([]); // Clear models
    setSearchInput("");

    const current = qs.parse(searchParams.toString());
    const query = {
      ...current,
      manufacturerId: null,
      modelId: null,
      search: null,
    };

    const url = qs.stringifyUrl(
      {
        url: window.location.href.split("?")[0],
        query,
      },
      { skipNull: true, arrayFormat: "none" }
    );

    router.push(url);
  };

  return (
    <div className="mb-8">
      <div className="flex flex-col gap-4 mb-2">
        <div>
          <h3 className="text-lg font-semibold">Search by OEM or Name</h3>
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Enter OEM number or Name"
            className="border border-gray-300 rounded px-2 py-1 w-full"
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold">Manufacturer</h3>
          <MultiSelect
            options={manuData.map((item: Manufacturer) => ({
              label: item.name,
              value: item.id.toString(),
            }))}
            value={selectedManufacturers} // Use selectedManufacturers state
            onValueChange={(values) => {
              setSelectedManufacturers(values);
            }}
            className="text-black"
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold">Model</h3>
          <MultiSelect
            options={modelData.map((item: Model) => ({
              label: item.name + ' (' + (item.year) + ')',
              value: item.id.toString(),
            }))}
            value={selectedModels} // Use selectedModels state
            onValueChange={(values) => {
              setSelectedModels(values);
            }}
            className="text-black"
          />
        </div>
      </div>
      <div className="flex gap-2">
        <Button onClick={applyFilters} className="mt-4">
          Apply
        </Button>
        <Button onClick={onClear} className="mt-4">
          Clear
        </Button>
      </div>
    </div>
  );
};

export default Filter;
