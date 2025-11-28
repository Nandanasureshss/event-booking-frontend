import React from 'react'
import { createContext, useState } from "react";

export const FilterContext = createContext();

export function FilterProvider({ children }) {
  const [filters, setFilters] = useState({
    location: "",
    date: null,
    eventType: "",
  });

  return (
    <FilterContext.Provider value={{ filters, setFilters }}>
      {children}
    </FilterContext.Provider>
  );
}
