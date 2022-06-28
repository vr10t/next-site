import Layout from "../src/components/layout";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { getBookings } from "../utils/supabase-helpers";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useAuthContext } from "../src/context/state";
import Table from "rc-table";
export default function admin() {
  const session = useAuthContext()
  const [bookings, setBookings] = useState([]);
  const bookingsHandler = async () =>
    await getBookings().then((res) => setBookings(res));

  const columns = [
    {
      title: "Pickup Date",
      dataIndex: "date",
      key: "date",
      width: 150,
    },
    {
      title: "Pickup location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Dropoff",
      dataIndex: "destination",
      key: "destination",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
  ];
  let weekdayshort = moment.weekdaysShort();
  bookings.sort(compare);
  const data = bookings.map((bookings) =>
    Object.assign(
      {},
      {
        key: bookings.id,
        date: bookings.pickup_date,
        location: bookings.pickup_location,
        destination: bookings.dropoff_destination,
        name: bookings.name,
        phone: bookings.phone,
        email: bookings.email,
      }
    )
  );
  console.log(data);

  useEffect(() => {
    bookingsHandler();
  }, []);
  // useEffect(()=>{

  // },[setBookings])
  const localizer = momentLocalizer(moment);
  function compare(a, b) {
    if (a.pickup_date < b.pickup_date || a.pickup_date === "ASAP") {
      return -1;
    }
    if (a.pickup_date > b.pickup_date) {
      return 1;
    }

    return 0;
  }
  function sortBookings() {
    bookings.sort(compare);
    // setBookings(sortedBookings)
    console.log(bookings);
    // console.log(sortedBookings);
  }
  function onRowClick(record,index){
      if (record !=null) {
          return <div className='fixed top-20 left-12 bg-sky-400 h-96 w-56'>
        
      </div>
      } else {
          return ""
      }
      
      
  }
  return (
     <>
    {session?.user.id==="86ceef51-5d75-44e3-973e-68c6cbf507f1" && <div className="h-full px-4 overflow-scroll ">
   { onRowClick()}
      <Table
        sticky
        rowClassName={"ring-1"}
        //   scroll={{x:2000,y:1000}}
        columns={columns}
        data={data}
        
        onRow={(record, index) => ({
          onClick: onRowClick.bind(null, record, index),
        })}
        className=" w-[2000px] bg-gray-100"></Table>
    </div>}</> 
  );
}
