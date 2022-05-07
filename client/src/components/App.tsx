import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch } from "../redux/hooks";
import { setLoggedIn, setToken } from "../redux/slices/loginSlice";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import NavBar from "./NavBar";
import Submit from "./Submit";
import Feed from "./Feed";
import Post from "./Post";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import Rules from "./Rules";
import Logout from "./Logout";

const App = (): JSX.Element => {
  let location = useLocation();
  let navigate = useNavigate()
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token: string = Cookies.get("token")! as string;
    if(token){
      dispatch(setLoggedIn(true));
      dispatch(setToken(token));
    }else{
      dispatch(setLoggedIn(false));
      navigate("/")
    }
  },[])
  return (
		<div className="App">
			<NavBar />
      <hr />
			<TransitionGroup>
				<CSSTransition
          key={location.key}
          exit={false}
					timeout={300}
					classNames="fade"
					transitionLeave={false}
				>
					<Routes>
						<Route path="/" element={<LoginForm />} />
						<Route path="/register" element={<RegisterForm />} />
						<Route path="/feed" element={<Feed />} />
						<Route path="/submit" element={<Submit />} />
						<Route path="/post/:id" element={<Post />} />
						<Route path="/rules" element={<Rules />} />
						<Route path="/logout" element={<Logout />} />
					</Routes>
				</CSSTransition>
			</TransitionGroup>
		</div>
	);
}

export default App;
