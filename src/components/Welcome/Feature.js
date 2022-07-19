function Features(props) {
  return (
    <div className="relative">
      <dt>
        <div className="absolute flex items-center justify-center h-12 w-12 rounded-md text-3xl bg-sky-600 text-white">
          
           <span>{props.icon} </span> 
          
        </div>
        <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
          {props.name}
        </p>
      </dt>
      <dd className="mt-2 ml-16 text-base text-gray-700">
        {props.description}
      </dd>
    </div>
  );
}
export default Features
