import { useEffect, useState } from "react";
import { Listbox } from "@headlessui/react";
import { FaCheck } from "@react-icons/all-files/fa/FaCheck";
import { FaMoneyBill } from "@react-icons/all-files/fa/FaMoneyBill";
import { FaCreditCard } from "@react-icons/all-files/fa/FaCreditCard";
import { useAppContext } from "../../context/state";
import { FaAngleDown } from "@react-icons/all-files/fa/FaAngleDown";

const methods = [
 
  {
    id: 1,
    name: "ASAP",
    unavailable: false,
    // icon: <FaMoneyBill className="z-0 text-2xl ml-2 text-sky-600" />,
  },
  {
    id: 2,
    name: "Later",
    unavailable: false,
    // icon: <FaCreditCard className="z-0 text-2xl ml-2 text-sky-600" />,
  },
];

export default function DateSelect() {
  const { data,setData } = useAppContext();
  const [state,updateState]= useState(false)
  const [selectedMethod, setSelectedMethod] = useState(methods[0]);

  useEffect(() => {
    setPaymentMethod()
    setData(data)
  }, [selectedMethod]);
 
  function setPaymentMethod(){
    
      data.date =selectedMethod.name 

      



  

    console.log(data.date);
  }
  return (
    <Listbox  value={selectedMethod} onChange={setSelectedMethod}>
      <Listbox.Button className="bg-gray-100 flex items-center justify-between w-80 px-8 text-base text-gray-800 rounded-r-lg h-10">
        <div className="text-left self-center grow">{selectedMethod.name}</div>

        {}
        <FaAngleDown className="z-[7] ml-4" />
      </Listbox.Button>
      <Listbox.Options
        style={{ borderRadius: "10px" }}
        className="absolute mt-10 ml-10  bg-gray-100 w-72 border-[2px] py-1 border-t-0  border-gray-200 rounded-b-2xl">
        {methods.map((method) => (
          <Listbox.Option
            className=" "
            key={method.id}
            value={method}
            disabled={method.unavailable}>
            {({ active, selected, disabled }) => (
              <span
                className={`flex h-10 rounded justify-start text-base gap-1  ${
                  !disabled && "h-10"
                } items-center ${
                  active
                    ? "bg-gray-200 text-gray-800"
                    : "bg-gray-100 text-gray-800"
                }`}>
                {/* {method.icon} */}
               <span className='ml-8'> {method.name}</span>

                {selected  &&  <span className='self-center'><FaCheck /></span>}
              </span>
            )}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
}
