import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import { setLoggedIn, setToken } from "../redux/slices/loginSlice";
import Cookies from "js-cookie";

const Logout = (): JSX.Element => {
  let navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    Cookies.remove("token");
    dispatch(setLoggedIn(false));
    dispatch(setToken(""));
  })
  return (
		<div>
			<h4>You have been logged out!</h4>
		</div>
	);
}

export default Logout;