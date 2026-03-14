"use client";

import { format } from "date-fns";
import { CalendarIcon, FunnelX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Card, CardContent, CardFooter } from "../ui/card";

interface DateFilterProps {
  date?: Date;
  onSelectDate?: (date: Date | undefined) => void;
  placeholder?: string;
}

export function DateFilter({
  date,
  onSelectDate,
  placeholder,
}: DateFilterProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!date}
          className="w-42 justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
        >
          <CalendarIcon />
          {date ? (
            format(date, "PPP")
          ) : (
            <span>{placeholder || "Selecione um data"}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Card size="sm">
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={onSelectDate}
              defaultMonth={date}
            />
          </CardContent>
          <CardFooter>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onSelectDate?.(undefined)}
            >
              <FunnelX />
              Limpar
            </Button>
          </CardFooter>
        </Card>
      </PopoverContent>
    </Popover>
  );
}
