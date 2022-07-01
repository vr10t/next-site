import { useAuthContext } from "../../context/state"

export default function Initial(props) {
const session = useAuthContext()
const initial = session?.user.email.slice(0, 1);
    return(
        <div onClick={props.onClick} className={`select-none bg-black/10 rounded-full h-full w-full flex justify-center items-center pb-2 text-black/80 font-medium cursor-pointer text-${props.text}`}>
              {initial}
            </div>
    )
}