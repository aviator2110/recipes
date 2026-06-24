import { createContext } from "react";

export const FavoritesContext = createContext();

const FavoritesProvider = ({ children }) => {
  return <FavoritesContext.Provider>{children}</FavoritesContext.Provider>;
};

export default FavoritesProvider;
