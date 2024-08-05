"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { Category } from "@/constants/constants";
import axios from "axios";

// Adjusted type for CategoriesContext
interface CategoriesContextType {
  categories: Category[];
  loading: boolean;
}

// Create context with a default value
const CategoriesContext = createContext<CategoriesContextType>({
  categories: [],
  loading: true,
});

interface Props {
  children: ReactNode;
}

export const CategoriesProvider = ({ children }: Props) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      const fetchedData = await axios.get("/api/categories");
      console.log(fetchedData)
      if (fetchedData) {
        const fetchedCategories = Object.values(fetchedData.data.results) as Category[];
        setCategories(fetchedCategories);
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <CategoriesContext.Provider value={{ categories, loading }}>
      {children}
    </CategoriesContext.Provider>
  );
};

export const useCategories = () => useContext(CategoriesContext);
