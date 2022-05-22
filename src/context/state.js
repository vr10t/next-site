import { createContext, useContext,useState } from "react";
const AppContext = createContext()
export function AppWrapper({ children }) {
    const [data, setData] = useState({})
  let sharedState={data:data,setData:(x)=>setData(x)}
    return (
      <AppContext.Provider value={sharedState}>
        {children}
      </AppContext.Provider>
    );
  }
  
  export function useAppContext() {
    return useContext(AppContext);
  }