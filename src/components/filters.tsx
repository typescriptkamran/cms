"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { OrderFilters, OrderStatus } from "@/types/Order";
import { CalendarIcon, FilterIcon } from "lucide-react";

interface FiltersProps {
  onFilterChange: (filters: Partial<OrderFilters>) => void;
  className?: string;
}

export function Filters({ onFilterChange, className }: FiltersProps) {
  const [timeRange, setTimeRange] = useState<string>("7days");
  const [shop, setShop] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  const handleTimeRangeChange = (value: string) => {
    setTimeRange(value);
    onFilterChange({ timeRange: value });
  };

  const handleShopChange = (value: string) => {
    setShop(value);
    onFilterChange({ shop: value });
  };

  const handleCountryChange = (value: string) => {
    setCountry(value);
    onFilterChange({ country: value });
  };

  const handleStatusChange = (value: string) => {
    setStatus(value);
    onFilterChange({ status: value as OrderStatus });
  };

  const handleReset = () => {
    setTimeRange("7days");
    setShop("");
    setCountry("");
    setStatus("");
    onFilterChange({
      timeRange: "7days",
      shop: "",
      country: "",
      status: undefined,
    });
  };

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {/* Time Range Filter */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="h-9">
            <CalendarIcon className="mr-2 h-4 w-4" />
            {timeRange === "7days"
              ? "Last 7 days"
              : timeRange === "30days"
                ? "Last 30 days"
                : timeRange === "90days"
                  ? "Last 90 days"
                  : "All time"}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48">
          <DropdownMenuRadioGroup
            value={timeRange}
            onValueChange={handleTimeRangeChange}
          >
            <DropdownMenuRadioItem value="7days">
              Last 7 days
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="30days">
              Last 30 days
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="90days">
              Last 90 days
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="all">All time</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Shop Filter */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="h-9">
            <FilterIcon className="mr-2 h-4 w-4" />
            {shop || "All Shops"}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48">
          <DropdownMenuRadioGroup value={shop} onValueChange={handleShopChange}>
            <DropdownMenuRadioItem value="">All Shops</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="Electronics Store">
              Electronics Store
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="Tech World">
              Tech World
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="Gadget Hub">
              Gadget Hub
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="Sound Systems">
              Sound Systems
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Country Filter */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="h-9">
            <FilterIcon className="mr-2 h-4 w-4" />
            {country || "All Countries"}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48">
          <DropdownMenuRadioGroup
            value={country}
            onValueChange={handleCountryChange}
          >
            <DropdownMenuRadioItem value="">
              All Countries
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="USA">USA</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="UK">UK</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="Canada">Canada</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="Australia">
              Australia
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Status Filter */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="h-9">
            <FilterIcon className="mr-2 h-4 w-4" />
            {status || "All Statuses"}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48">
          <DropdownMenuRadioGroup
            value={status}
            onValueChange={handleStatusChange}
          >
            <DropdownMenuRadioItem value="">All Statuses</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="paid">Paid</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="processing">
              Processing
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="failed">Failed</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="shipped">
              Shipped
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="delivered">
              Delivered
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="cancelled">
              Cancelled
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Reset Button */}
      <Button variant="ghost" size="sm" className="h-9" onClick={handleReset}>
        Reset Filters
      </Button>
    </div>
  );
}
