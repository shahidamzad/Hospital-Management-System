import { createContext } from "react";
import { doctors } from "../assets/assets.js";

export const AppContext = createContext();


const appContextProvider = (props) => {
    

    const value ={
        doctors
    }

    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default appContextProvider ;