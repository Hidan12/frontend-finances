import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { usersSet } from "../../store/actions/actionUsersAll"

const Header = ({handlerBotton})=>{
    const {user, token} = useSelector(state => state.loginReducer)
    const {searchUs} = useSelector(state => state.usersReducer)

    console.log(searchUs);
    
    const dispatch = useDispatch()
    useEffect(()=>{
        if(token != ""){
            dispatch(usersSet({token: token, search:""}))
        }
    },[token])

    useEffect(()=>{
        if (token != "") {
            dispatch(usersSet({token: token, search: searchUs}))
        }
    },[searchUs])
    
    return(
        <div className="w-full h-[15vh] bg-black/90 grid grid-cols-2 items-center">
            <div className="fex justify-start w-full">
                <p className="text-white">Recuperacion</p>
            </div>
            <div className="flex justify-end w-full">
                {user.name ? <button className="text-white me-4 p-2 bg-black" onClick={handlerBotton} >{user.name}</button> : <button onClick={handlerBotton} className="text-white m-4 p-2 bg-black">Login</button>}
            </div>
        </div>
    )
}

export {Header}