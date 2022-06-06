import { useEffect, useState } from "react";
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
    icon: <FaMoneyBill className="z-0 text-2xl ml-2 text-sky-600" />,
  },
  {
    id: 2,
    name: "Card",
    unavailable: false,
    icon: <FaCreditCard className="z-0 text-2xl ml-2 text-sky-600" />,
  },
];

export default function PaymentSelect() {
  const { data } = useAppContext();
  const [selectedMethod, setSelectedMethod] = useState(methods[0]);

  useEffect(() => {
    if(selectedMethod.id !== 999){ data.payment =selectedMethod.name 
}
  

    console.log(data.payment);
  }, [selectedMethod]);
  return (
    <Listbox value={selectedMethod} onChange={setSelectedMethod}>
      <Listbox.Button className="bg-sky-600 flex items-center justify-between px-8 text-lg text-white rounded-lg h-12">
        <div className="text-left self-center grow">{selectedMethod.name}</div>

        {}
        <FaAngleDown className="z-[7]" />
      </Listbox.Button>
      <Listbox.Options
        style={{ borderRadius: "10px" }}
        className="border-[2px] py-2 border-t-0  border-gray-400 rounded-b-2xl">
        {methods.map((method) => (
          <Listbox.Option
            className=" "
            key={method.id}
            value={method}
            disabled={method.unavailable}>
            {({ active, selected, disabled }) => (
              <li
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
              </li>
            )}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  );
}
