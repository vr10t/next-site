import { createContext, useContext, useState,useEffect,useReducer } from "react";
import { supabase } from "../../utils/supabaseClient";

const AppContext = createContext();
const AuthContext = createContext();
const reducer = (state, pair) => ({ ...state, ...pair })

const initialState = {}
export function AppWrapper({ children }) {
 
const [data, setData] = useReducer(reducer, initialState)
  // const [data, setData] = useState({});
  // let sharedState = { data: data, setData: (x) => setData(x) };
  return (
    <AppContext.Provider value={{data,setData}}>{children}</AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
export function AuthWrapper({ children }) {
  const [session, setSession] = useState(null);
 
  useEffect(() => {
    setSession(supabase.auth.session());
    console.log(session,"session");
    supabase.auth.onAuthStateChange((_event, session) => {
      console.log(_event);
      setSession(session);
    });
  }, []);
  return (
    <AuthContext.Provider value={session}>{children}</AuthContext.Provider>
  );
}
export function useAuthContext() {
  return useContext(AuthContext);
}
