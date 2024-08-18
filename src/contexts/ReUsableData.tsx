"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { Category, COMETCHAT_CONSTANTS } from "@/constants/constants";
import axios from "axios";
import { toast } from "@/components/ui-hooks/use-toast";
import { useSession } from "next-auth/react";
import {
  CometChatUIKit,
  UIKitSettingsBuilder,
} from "@cometchat/chat-uikit-react";

interface CategoriesContextType {
  categories: Category[];
  collections: [];
  collectionLoading: boolean;
  setCollections: React.Dispatch<any>;
  setCollectionLoading: React.Dispatch<any>;
  loading: boolean;
  initialized: boolean;
  user: any | undefined;
}

const CategoriesContext = createContext<CategoriesContextType>({
  categories: [],
  collections: [],
  collectionLoading: true,
  setCollections: () => {},
  setCollectionLoading: () => {},
  loading: true,
  initialized: false,
  user: undefined,
});

interface Props {
  children: ReactNode;
}

export const CategoriesProvider = ({ children }: Props) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [collectionLoading, setCollectionLoading] = useState(true);
  const [collections, setCollections] = useState<[]>([]);
  const [user, setUser] = useState<any>(undefined);
  const { data: session, status } = useSession();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedData = await axios.get("/api/categories");
        if (fetchedData) {
          const fetchedCategories = Object.values(
            fetchedData.data.results
          ) as Category[];
          setCategories(fetchedCategories);
          setLoading(false);
        } else {
          setCategories([]);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        setCategories([]);
        toast({
          title: "Network error",
          description: "Ensure you have a stable internet connection.",
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
      } catch (error) {
        console.error("Failed to fetch collection:", error);
      }
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
        initialized,
        user,
        setCollectionLoading,
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};

export const useCategories = () => useContext(CategoriesContext);
