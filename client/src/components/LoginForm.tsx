import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Login } from "../redux/thunks";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import LoadingCircles from "./LoadingCircles";

const LoginForm = (): JSX.Element => {
	let navigate = useNavigate();
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const dispatch = useAppDispatch();
	const status: string = useAppSelector((state) => state.login.status);

	const handleSubmit = () => {
		dispatch(
			Login({
				username: username,
				password: password,
			})
		);
	};

	useEffect(() => {
		if (status === "fulfilled") {
			navigate("/feed");
		}
	}, [status]);
  
	return (
		<div className="Login">
			{status === "pending" && (
        <LoadingCircles />
			)}
			{status === "rejected" && <span className="red">Login failed!</span>}
			<input
				type="text"
				placeholder="Username"
				value={username}
				onChange={(e) => {
					setUsername(e.target.value);
				}}
			/>
			<input
				type="password"
				placeholder="Password"
				value={password}
				onChange={(e) => {
					setPassword(e.target.value);
				}}
			/>
			<button onClick={handleSubmit}>Login</button>
			<hr />
			<Link to="/register" id="invite">
				got an invite?
			</Link>
		</div>
	);
};

export default LoginForm;