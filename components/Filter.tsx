import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "./ui/separator";

interface FilterProps {
  types: { name: string }[];
  selectedTypes: string[];
  updateSearchParam: (name: string, type: string) => void;
}

const Filter: React.FC<FilterProps> = ({
  types,
  selectedTypes,
  updateSearchParam,
}) => {
  return (
    <div className="flex flex-wrap justify-center">
      {types.map((type) => {
        const isActive = selectedTypes.includes(type.name);
        return (
          <div className="flex items-center mx-1">
            <Checkbox
              id={type.name}
              value={type.name}
              checked={isActive}
              onClick={() => updateSearchParam("filter", type.name)}
            />
            <label htmlFor={type.name}>{type.name.toUpperCase()}</label>
          </div>
        );
      })}
    </div>
  );
};

export default Filter;
