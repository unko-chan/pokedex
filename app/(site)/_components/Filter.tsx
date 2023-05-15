import React from "react";

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
    <div>
      {types.map((type) => {
        const isActive = selectedTypes.includes(type.name);
        return (
          <label key={type.name}>
            <input
              type="checkbox"
              value={type.name}
              checked={isActive}
              onChange={() => updateSearchParam("filter", type.name)}
            />
            {type.name.toUpperCase()}
          </label>
        );
      })}
    </div>
  );
};

export default Filter;
