import React, { PropsWithChildren, useEffect, useState } from "react";
import Icon from "@/common/components/icon";
import Input from "@/common/components/input";
import { Filters } from "./enums";
import { useDebouncedValue } from "@/common/hooks/debounce";

interface Props extends PropsWithChildren {
  searchPlaceholder?: string;
  onSearch?: (value: string) => void;
  searchedValue: string;
  activeFilter?: Filters;
  onActiveFilterChange?: (value: Filters) => void;
}

export default function Header({
  searchPlaceholder,
  children,
  onSearch,
  activeFilter,
  onActiveFilterChange,
  searchedValue
}: Props) {
  const [inputValue, setInputValue] = useState(searchedValue);
  const debouncedValue = useDebouncedValue(inputValue, 500);
  const isGridFilter = activeFilter === Filters.grid;
  const showSearch = searchPlaceholder && onSearch;

  useEffect(() => {
    setInputValue(searchedValue);
  }, [searchedValue]);

  useEffect(() => {
    onSearch?.(debouncedValue);
  }, [debouncedValue, onSearch]);

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex flex-1 items-center justify-between rounded-xl bg-white px-4 py-3">
        <div className="flex items-center gap-4">
          {!!onActiveFilterChange && (
            <div className="flex items-center gap-2">
              <div className="cursor-pointer bg-gray-light p-3" onClick={() => onActiveFilterChange(Filters.grid)}>
                <Icon name={isGridFilter ? "filter-grid-active" : "filter-grid"} size={16} />
              </div>
              <div className="cursor-pointer bg-gray-light p-3" onClick={() => onActiveFilterChange(Filters.table)}>
                <Icon name={!isGridFilter ? "filter-table-active" : "filter-table"} size={16} />
              </div>
            </div>
          )}
        </div>
        {showSearch && (
          <div className="w-[280px]">
            <Input
              onChange={e => setInputValue(e.target.value)}
              value={inputValue}
              placeholder={searchPlaceholder}
              endIcons={<Icon name="search" size={16} />}
              size={16}
            />
          </div>
        )}
      </div>
      {children}
    </div>
  );
}
