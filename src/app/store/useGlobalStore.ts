import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface GlobalState {
    searchBarIsOpen:boolean;
    setSearchBarIsOpen: (isOpen:boolean)=>void;
};

export const useGlobalStore = create<GlobalState>()(
    persist(
        (set)=>({
            searchBarIsOpen:false,
            setSearchBarIsOpen:(isOpen:boolean)=>set(()=>({
                searchBarIsOpen:isOpen
            })),
        }),{
            name: "global-storage",
            storage: createJSONStorage(()=> localStorage)
        }
    )
)