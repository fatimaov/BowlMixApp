import { useContext } from "react";
import { UserIngredientsContext } from "./UserIngredientsContext";

export function useUserIngredients() {
  const context = useContext(UserIngredientsContext);

  if (context === undefined) {
    throw new Error(
      "useUserIngredients must be used within a UserIngredientsProvider.",
    );
  }

  return context;
}
