import { Link, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Register } from "../redux/thunks";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import LoadingCircles from "./LoadingCircles";

const RegisterForm = (): JSX.Element => {
  let navigate = useNavigate();

	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [invite, setInvite] = useState<string>("");

	const dispatch = useAppDispatch();
	const status: string = useAppSelector((state) => state.register.status);

	const handleSubmit = () => {

		dispatch(
			Register({
				username: username,
				password: password,
				invite: invite,
			})
		);
	};

  useEffect(()=> {
    if(status === "fulfilled"){
      navigate("/");
    }
  },[status])

	return (
		<div className="Register">
			{status === "pending" && (
				<div className="LoadingModal">
					<LoadingCircles />
				</div>
			)}
			{status === "rejected" && <span className="red">Failed!</span>}
			<label>Username</label>
			<input
				value={username}
				onChange={(e) => {
					setUsername(e.target.value);
				}}
				type="text"
			/>

			<label>Password</label>
			<input
				value={password}
				onChange={(e) => {
					setPassword(e.target.value);
				}}
				type="password"
			/>

			<label>Invite Code</label>
			<input
				value={invite}
				onChange={(e) => {
					setInvite(e.target.value);
				}}
				type="text"
			/>

			<button onClick={handleSubmit}>Register</button>
			<hr />
			<Link to="/" id="invite">
				back
			</Link>
		</div>
	);
};

export default RegisterForm;