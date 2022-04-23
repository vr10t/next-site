import styles from "./Form.module.css"
export default function InputField(props) {
  
    return (
     <>
<label className="flex flex-row text-stone-800 font-bold">{props.icon} {props.label}</label>
        <input
          className={`flex md:my-2 mx-1  h-16 md:w-72 ${styles.bgAni} hover:from-orange-500 hover:to-rose-600 bg-gradient-to-r from-orange-400 to-rose-500  rounded-full text-white shadow-md  font-bold placeholder-white md:indent-2 px-4 `}
          name={props.name}
          required={props.required}
          type={props.type}
          placeholder={props.placeholder}
          defaultValue={props.defaultValue}
          min={props.min}
          max={props.max}
        />
        
     </>
    );
  }

