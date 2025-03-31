import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface GlobalState {
    searchBarIsOpen:boolean;
    setSearchBarIsOpen: (isOpen:boolean)=>void;
};

export const useGlobalStore = create<GlobalState>()(
    persist(
        (set,get)=>({
            searchBarIsOpen:false,
            setSearchBarIsOpen:(isOpen:boolean)=>set((state)=>({
                searchBarIsOpen:isOpen
            })),
        }),{
            name: "global-storage",
            storage: createJSONStorage(()=> localStorage)
        }
    )
)