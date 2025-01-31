"use client";
import React, { useEffect, useState } from "react";
import SearchInput from "../home-page/search-input";
import FilterMenu from "./filter-menu";
import Card from "../cards/card";
import Container from "../ui/container";
import { BsFillHouseExclamationFill } from "react-icons/bs";
import type { PropertySearchParams } from "@/app/properties/page";
import { getFilteredProperties } from "@/lib/functions/getFilteredProperties";
import { PropertyTypes } from "../cards/type";
import CardSkeleton from "../cards/skeleton";
import { useInView } from "framer-motion";
import { useRef } from "react";

const FilteredData = ({
  searchParams,
  noOptions,
}: PropertySearchParams & { noOptions?: boolean }) => {
  const [properties, setProperties] = useState<PropertyTypes[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefetching, setIsRefetching] = useState(true);
  const [loadedPage, setLoadedPage] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const ref = useRef(null);
  const isVisible = useInView(ref);
  const fetchData = async (refetch?: boolean) => {
    if (refetch) {
      setIsRefetching(true);
      setProperties([]);
    } else {
      setIsLoading(true);
    }

    const data =
      (await getFilteredProperties(searchParams!, refetch ? 0 : loadedPage)) ??
      [];
    if (data.length > 0) {
      setProperties((prev) => {
        if (refetch) {
          return data;
        }
        return [...prev, ...data];
      });

      setLoadedPage((prev) => prev + 1);
    } else {
      setIsFinished(true);
    }
    setIsLoading(false);
    setIsRefetching(false);
  };

  useEffect(() => {
    setLoadedPage(0);
    fetchData(true);
  }, [searchParams]);

  useEffect(() => {
    if (isVisible && !isLoading && !isRefetching && !isFinished) {
      fetchData();
    }
  }, [isVisible]);

  return (
    <div className="flex-grow">
      <div className="flex pb-4 flex-col">
        {!noOptions && <SearchInput full />}
        {!noOptions && <FilterMenu />}
      </div>
      <div className="grid w-full grid-cols-2 gap-2 sm:gap-4 md:grid-cols-3 xl:grid-cols-4">
        {properties?.length > 0 &&
          properties.map((property) => (
            <Card key={property.id} {...property} />
          ))}
        {isRefetching &&
          Array(4)
            .fill(null)
            .map((_, index) => <CardSkeleton key={index} />)}
        {isLoading && <CardSkeleton />}
      </div>
      {!isRefetching && properties.length === 0 && (
        <Container
          center
          className="pt-[100px] opacity-70 flex-col text-[12px] text-center"
        >
          <BsFillHouseExclamationFill size={30} />
          <p>No properties found</p>
        </Container>
      )}
      <div ref={ref} className="h-24"></div>
    </div>
  );
};

export default FilteredData;
