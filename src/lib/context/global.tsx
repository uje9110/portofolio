import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

type GlobalContextType = {
  navigation: string;
  setNavigation: Dispatch<SetStateAction<string>>;
};

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [navigation, setNavigation] = useState<string>("home");
  return (
    <GlobalContext.Provider value={{ navigation, setNavigation }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context)
    throw new Error("useGlobalContext need to be within GlobalContextProvider");
  return context;
};
