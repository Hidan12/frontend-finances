import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usersSet } from "../../store/actions/actionUsersAll";

const Header = ({ handlerBotton }) => {
  const { user, token } = useSelector((state) => state.loginReducer);
  const { searchUs } = useSelector((state) => state.usersReducer);

  console.log(searchUs);

  const dispatch = useDispatch();
  useEffect(() => {
    if (token != "") {
      dispatch(usersSet({ token: token, search: "" }));
    }
  }, [token]);

  useEffect(() => {
    if (token != "") {
      dispatch(usersSet({ token: token, search: searchUs }));
    }
  }, [searchUs]);

  return (
    <div className="w-full h-[15vh] flex bg-black/90 justify-center gap-4 items-center">
      <div className="  w-full">
        <p className="text-white">Recuperacion</p>
      </div>
      <div>
        <button className="text-white font-bold "
          link
          to="/Property"
        >
          Property
        </button>
        
      </div>
      <div>
        <button className="text-white font-bold "
          link
          to="/finance"
        >
          Finance
        </button>
        
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
          <button
            onClick={handlerBotton}
            className="text-white m-4 p-2 bg-black"
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export { Header };
