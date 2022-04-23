
export default function ServicesItem(props) {
  return (
    <div className=" px-4 ">
      <div className="bg-gray-50 h-56 shadow-md text-center flex rounded-xl p-4 my-4 flex-col">
        <h1 className="mx-auto text-6xl text-amber-400"> {props.icon} </h1>
        <h4>{props.title}</h4>
        <h6>{props.text}</h6>
      </div>
    </div>
  );
}
