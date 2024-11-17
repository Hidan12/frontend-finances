import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usersSet } from "../../store/actions/actionUsersAll";
import { setProperties } from "../../store/actions/actionProperty";
// import CreateUser from "../user/CreateUser";


const Header = ({ handlerBotton, handlerClickCreateUser }) => {
  const { user, token } = useSelector((state) => state.loginReducer);
  const { searchUs } = useSelector((state) => state.usersReducer);
  const { searchPro } = useSelector((state) => state.PropertyReducer);

  console.log(searchUs);


  const dispatch = useDispatch();
  useEffect(() => {
    if (token != "") {
      dispatch(usersSet({ token: token, search: "" }));
      dispatch(setProperties({ token: token, search: "" }));
    }
  }, [token]);

  useEffect(() => {
    if (token != "") {
      dispatch(usersSet({ token: token, search: searchUs }));
    }
  }, [searchUs]);

 

  useEffect(() => {
    if (token != "") {
      dispatch(setProperties({ token: token, search: searchPro }));
    }
  }, [searchPro]);

  const handlerCreateModal = ()=>{
    dispatch(clearCreate())
}


  return (
    <div className="w-full h-[15vh] flex bg-black/90 justify-center gap-4 items-center">
      <div className="  w-full">
        <p className="text-white">Recuperacion</p>
      </div>
      
      <div className="flex justify-end w-full">
        {user.name ? (
          <button
            className="text-white me-4 p-2 bg-black"
            onClick={handlerBotton}
          >
            {user.name}
          </button>
        ) : (
          <div>
            <button onClick={()=>handlerClickCreateUser()}>
          <p className=" text-white ">Crear Cuenta</p>
            </button>
          <button
            onClick={handlerBotton}
            className="text-white m-4 p-2 bg-black"
          >
            Login
          </button>
        </div>)
        }
      </div>
    </div>
  );
};

export { Header };
