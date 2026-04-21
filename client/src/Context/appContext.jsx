import { createContext } from "react";
import { doctors } from "../assets/assets";

export const appContext = createContext();


const appContextProvider = (props) => {
    

    const value ={
        doctors
    }

    return(
        <appContext.Provider value={value}>
            {props.children}
        </appContext.Provider>
    )
}

export default appContextProvider ;