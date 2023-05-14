import React, { useState, useEffect } from "react";
import { getTypes } from "../utils/pokeapi";

const Filter: React.FC = () => {
  const [types, setTypes] = useState<{ name: string }[]>([]);

  // gotta lift state up
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  useEffect(() => {
    getTypes().then((response) => {
      setTypes(response.results);
    });
  }, []);

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

  console.log(selectedTypes);

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
