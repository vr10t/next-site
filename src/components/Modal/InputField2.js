import styles from "./Form.module.css";
export default function InputField(props) {
  return (
    <>
      <label className="flex ml-2 md:ml-0 flex-row text-stone-800 font-bold">
        {props.icon} {props.label}
      </label>
      <input
        className={`flex md:my-2 mx-1 w-full h-16 xl:w-72 ${styles.bgAni} hover:from-sky-600 hover:to-cyan-500 bg-gradient-to-r from-sky-500 to-cyan-400  rounded-full text-white shadow-md  font-bold placeholder-white md:indent-2 px-4 `}
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
