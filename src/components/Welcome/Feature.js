export default function Features(props,{children}) {
  return (
    <div className="relative">
      <dt>
        <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-orange-500 text-white">
          
           <span>{children}</span> 
          
        </div>
        <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
          {props.name}
        </p>
      </dt>
      <dd className="mt-2 ml-16 text-base text-gray-500">
        {props.description}
      </dd>
    </div>
  );
}