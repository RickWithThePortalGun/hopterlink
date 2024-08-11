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
import { toast } from "@/components/ui-hooks/use-toast";

// Adjusted type for CategoriesContext
interface CategoriesContextType {
  categories: Category[];
  collections: [];
  collectionLoading: boolean;
  setCollections: any;
  setCollectionLoading: any;
  loading: boolean;
}

// Create context with a default value
const CategoriesContext = createContext<CategoriesContextType>({
  categories: [],
  loading: true,
  collections: [],
  collectionLoading: true,
  setCollections: () => {},
  setCollectionLoading: () => {},
});

interface Props {
  children: ReactNode;
}

export const CategoriesProvider = ({ children }: Props) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [collectionLoading, setCollectionLoading] = useState(true);
  const [collections, setCollections] = useState<[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedData = await axios.get("/api/categories");
        if (fetchedData) {
          const fetchedCategories = Object.values(
            fetchedData.data.results,
          ) as Category[];
          setCategories(fetchedCategories);
          setLoading(false);
        } else {
          setCategories([]);
        }
      } catch (error) {
        setCategories([]);
        toast({
          title: "Network error",
          description: "Ensure you have an internet connection.",
        });
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchCollection = async () => {
      setCollectionLoading(true);
      try {
        const response = await axios.get("/api/collection/");
        setCollections(response.data);
      } catch (error) {}
      setCollectionLoading(false);
    };
    void fetchCollection();
  }, []);

  return (
    <CategoriesContext.Provider
      value={{
        collections,
        setCollections,
        collectionLoading,
        categories,
        loading,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};

export const useCategories = () => useContext(CategoriesContext);
