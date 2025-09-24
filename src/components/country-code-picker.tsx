"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { countries, Country } from "@/lib/country-codes";

interface CountryCodePickerProps {
  value?: string;
  onChange: (value: string) => void;
  className?: string;
}

export function CountryCodePicker({ value, onChange, className }: CountryCodePickerProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");

  const selectedCountry = countries.find((country) => country.dial_code === value) || countries.find(c => c.code === 'US');

  const filteredCountries = React.useMemo(() => {
    if (!search) return countries;
    return countries.filter((country) => {
      const searchLower = search.toLowerCase();
      return (
        country.name.toLowerCase().includes(searchLower) ||
        country.dial_code.includes(searchLower)
      );
    });
  }, [search]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-[90px] justify-between rounded-r-none", className)}
        >
          {selectedCountry ? (
            <div className="flex items-center gap-2">
              <img
                src={`https://flagcdn.com/${selectedCountry.code.toLowerCase()}.svg`}
                alt={selectedCountry.name}
                className="h-4 w-6"
              />
            </div>
          ) : (
            "Select"
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0">
        <div className="p-2">
          <Input
            placeholder="Search country..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <ScrollArea className="h-[300px]">
          {filteredCountries.map((country) => (
            <div
              key={country.code}
              onClick={() => {
                onChange(country.dial_code);
                setOpen(false);
              }}
              className="flex items-center gap-2 p-2 cursor-pointer hover:bg-accent"
            >
              <img
                src={`https://flagcdn.com/${country.code.toLowerCase()}.svg`}
                alt={country.name}
                className="h-4 w-6"
              />
              <span className="flex-1 text-sm">{country.name}</span>
              <span className="text-sm text-muted-foreground">{country.dial_code}</span>
            </div>
          ))}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}