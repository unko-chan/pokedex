import React, { useState, useEffect } from "react";

interface FilterProps {
  types: { name: string }[];
  selectedTypes: string[];
  setSelectedTypes: (types: string[]) => void;
}

const Filter: React.FC<FilterProps> = ({ types, selectedTypes, setSelectedTypes }) => {

  const isChecked = (type: string) => {
    return selectedTypes.includes(type);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedTypes([...selectedTypes, value]);
    } else {
      // less readable than using splice
      setSelectedTypes(selectedTypes.filter((type) => type !== value));
    }
  };

  return (
    <div>
      <div>Filter</div>
      <div>
        {types.map((type) => (
          <label key={type.name}>
            <input
              type="checkbox"
              value={type.name}
              checked={isChecked(type.name)}
              onChange={handleChange}
            />
            {type.name}
          </label>
        ))}
      </div>
    </div>
  );
};

export default Filter;
