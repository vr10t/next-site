import { User } from "@supabase/supabase-js";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useReducer,
  Dispatch,
} from "react";
import { supabase } from "../../utils/supabaseClient";

export interface AppData {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  return_first_name: string;
  return_last_name: string;
  return_email: string;
  return_phone: string;
  location: string;
  destination: string;
  passengers: string;
  date: string;
  time: string;
  return_date: string;
  flight_number: string;
  distance: string;
  service: string;
  return_time: string;
  plane_arriving_from: string;
  airline_name: string;
  return_location: string;
  return_destination: string;
  total_trip_price: number;
  duration:string;
  payment:string;
  return:boolean,
  flight_monitoring:boolean,
  instructions:string,
  return_instructions:string,
  return_passengers:string,
 price_per_mile:number,
  user_id:string,
  return_service:string,
}
type InitialStateType = {
  data: AppData;
  setData: Dispatch<any>;
};
interface ExtendedUser extends User {
  stripe_customer: any;
  first_name: string;
  last_name: string;
  phone: string;
  email:string;
  bookings: string[];
}
const initialState = {
  data: {
    id:"",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    return_first_name: "",
    return_last_name: "",
    return_email: "",
    return_phone: "",
    location: "",
    destination: "",
    passengers: "",
    date: "",
    time: "",
    return_date: "",
    flight_number: "",
    distance: "",
    service: "",
    return_time: "",
    plane_arriving_from: "",
    airline_name: "",
    return_location: "",
    return_destination: "",
    total_trip_price: 0,
    duration:"",
    payment:"",
return:false,
flight_monitoring:false,
instructions:"",
return_instructions:"",
return_passengers:"",
price_per_mile:4,
user_id:"",
return_service:"",
  },
  setData: () => {},
};
const AppContext = createContext<InitialStateType>(initialState);
const AuthContext = createContext<ExtendedUser>({
  id: "",
  app_metadata: { key: "" },
  user_metadata: { key: "" },
  aud: "",
  created_at: "",
  first_name:"",
  last_name:"",
  phone:"",
  email:"",
  bookings:[""],
});
const reducer = (state: any, pair: any) => ({ ...state, ...pair });

export function AppWrapper({ children }: any) {
  const [data, setData] = useReducer(reducer, initialState);
  // const [data, setData] = useState({});
  // let sharedState = { data: data, setData: (x) => setData(x) };
  return (
    <AppContext.Provider value={{ data, setData }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
export function AuthWrapper({ children }: any) {
  const [user, setUser] = useState<ExtendedUser>(
    supabase.auth.user() as ExtendedUser
  );

  useEffect(() => {
    const getUserProfile = async () => {
      const sessionUser = supabase.auth.user();
      if (sessionUser) {
        const { data: profile } = await supabase
          .from("profiles")
          .select()
          .eq("id", sessionUser.id)
          .single();
        setUser({ ...sessionUser, ...profile });
      }
    };
    getUserProfile();
    console.log(user, "USER");
    supabase.auth.onAuthStateChange((_event, user) => {
      console.log(_event);
      getUserProfile();
    });
  }, []);
  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}
export function useAuthContext() {
  return useContext(AuthContext);
}
