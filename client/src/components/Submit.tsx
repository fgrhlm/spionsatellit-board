import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { useNavigate } from "react-router-dom";
import { SubmitPost } from "../redux/thunks";

const Submit = (): JSX.Element => {
	let navigate = useNavigate();
	const dispatch = useAppDispatch();
	const status: string = useAppSelector((state) => state.submitForm.status);
	const [title, setTitle] = useState<string>("");
	const [body, setBody] = useState<string>("");

	const handleSubmit = () => {
		dispatch(
			SubmitPost({
				title: title,
				body: body,
			})
		);
	};

	useEffect(() => {
		if (status === "success"){
      setBody("");
      setTitle("");
    }
	}, [status]);

	return (
		<div className="Submit">
			{status === "success" && <span className="green text-black">Post submitted!</span>}
			{status === "rejected" && (
				<span className="red">Failed to submit, try again later!</span>
			)}
			<label>Title</label>
			<input
				type="text"
				value={title}
				onChange={(e) => {
					setTitle(e.target.value);
				}}
			/>
			<label>Whats on your mind?</label>
			<textarea
				value={body}
				onChange={(e) => {
					setBody(e.target.value);
				}}
			/>
			<button onClick={handleSubmit}>
				{status === "pending" && "Sending.."}
				{status === "idle" && "Submit Post!"}
				{status === "success" && "Submit Post!"}
			</button>
			<hr />
			<div>
				<b className="red">ATTENTION!</b>
				<p>Please read the rules before submitting a post.</p>
				<p>Posting material that violates the rules will result in a ban.</p>
			</div>
		</div>
	);
};

export default Submit;