import {createContext, useState} from "react"

export const DataContext = createContext(null);

const DataProvider = ({children})=>{

    const [account, setAccount] =useState({username: '',name: ''}); 
    return(
        <DataContext.Provider value ={{
            setAccount, 
            account 
       }}>
        {children }
        </DataContext.Provider>
    )
}
export default DataProvider;