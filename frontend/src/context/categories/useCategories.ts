import { useContext } from "react";
import { CategoriesContext } from "./CategoriesContext";

export function useCategories() {
  const context = useContext(CategoriesContext);

  if (context === undefined) {
    throw new Error("useCategories must be used within a CategoriesProvider.");
  }

  return context;
}
