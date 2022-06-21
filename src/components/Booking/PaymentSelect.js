import { useEffect, useRef, useState } from "react";
import { Listbox } from "@headlessui/react";
import { FaCheck } from "@react-icons/all-files/fa/FaCheck";
import { FaMoneyBill } from "@react-icons/all-files/fa/FaMoneyBill";
import { FaCreditCard } from "@react-icons/all-files/fa/FaCreditCard";
import { useAppContext } from "../../context/state";
import { FaAngleDown } from "@react-icons/all-files/fa/FaAngleDown";

const methods = [
  { id: 999, name: "Payment Method", unavailable: true },
  {
    id: 1,
    name: "Cash",
    unavailable: false,
    icon: <FaMoneyBill className="z-0 text-2xl ml-2 text-sky-500" />,
  },
  {
    id: 2,
    name: "Card",
    unavailable: false,
    icon: <FaCreditCard className="z-0 text-2xl ml-2 text-sky-500" />,
  },
];

export default function PaymentSelect() {
  const renders = useRef(0)
  const { data,setData } = useAppContext();
  const [state,updateState]= useState(false)
  const [selectedMethod, setSelectedMethod] = useState(methods[0]);
useEffect(()=>{
  if(renders.current<=1){
    console.log(eval("data.payment"),"evaling");
  if(data.payment){
    console.log("data.payment",data.payment,"selectedMethod",selectedMethod);
    selectedMethod.name=data.payment
  setSelectedMethod(selectedMethod)
  }
  }
  
  
},[data])
  useEffect(() => {
    if(renders.current>1){
      console.log("if");
      setPaymentMethod()
    setData(data)
    }
    else{
      console.log("else");
      renders.current++
    }
    
  }, [selectedMethod]);
 
  function setPaymentMethod(){
    if(selectedMethod.id !== 999){ 
      data.payment =selectedMethod.name 

      

}

  

    console.log(data.payment);
  }
  return (
    <Listbox value={selectedMethod} onChange={setSelectedMethod}>
      <Listbox.Button className="bg-sky-600 flex items-center justify-between px-8 text-lg text-white rounded-lg h-10">
        <div className="text-left self-center grow">{selectedMethod.name}</div>

        {}
        <FaAngleDown className="z-[7]" />
      </Listbox.Button>
      <Listbox.Options
        style={{ borderRadius: "10px" }}
        className="absolute mt-[9.5rem] ml-  bg-gray-100 w-5/6 border-[2px] py-1 border-t-0  border-gray-200 rounded-b-2xl">
        {methods.map((method) => (
          <Listbox.Option
            className=" "
            key={method.id}
            value={method}
            disabled={method.unavailable}>
            {({ active, selected, disabled }) => (
              <span
                className={`flex font-semibold gap-2 w-full ${
                  !disabled && "h-12"
                } items-center ${
                  active
                    ? "bg-gray-200 text-gray-800"
                    : "bg-gray-50 text-gray-800"
                }`}>
                {method.icon}
                {method.id !== 999 && method.name}

                {selected && method.id !== 999 && <FaCheck />}
              </span>
            )}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
}
