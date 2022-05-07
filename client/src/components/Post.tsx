import { useEffect, useState } from "react"; 
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { FindPost, SubmitComment } from "../redux/thunks";
import { setStatus } from "../redux/slices/commentFormSlice";
import { ICommentRequest } from "../interfaces/ICommentRequest";
import IDLink from "./IDLink";
import IPost from "../interfaces/IPost";

const Post = (): JSX.Element => {
	let { id } = useParams();
	const [commentBody, setCommentBody] = useState<string>("");
	const dispatch = useAppDispatch();
	const post: IPost = useAppSelector((state) => state.currentPost.post);
	const status: string = useAppSelector((state) => state.commentForm.status);

	useEffect(() => {
		dispatch(setStatus("idle"));
		dispatch(FindPost(id!));
	}, []);

  useEffect(() => {
		dispatch(FindPost(id!));
	}, [status]);

	const handleSubmit = () => {
		const comment: ICommentRequest = {
			parentId: post._id,
			body: commentBody,
		};
		dispatch(SubmitComment(comment));
    setCommentBody("")
  };

	return (
		<div className="Post">
			<IDLink id={post._id} />
			<h4>{post.title}</h4>
			<ReactMarkdown className="TextBody">{post.body}</ReactMarkdown>
			<div id="new-comment">
        <textarea
          value={commentBody}
          onChange={(e) => {
            setCommentBody(e.target.value);
          }}
        ></textarea>
        <button onClick={handleSubmit}>Submit</button>
			</div>
			<hr />
      <h4>Comments</h4>
			<ul>
				{post.comments ? (
					post.comments.map((c) => (
						<li key={c._id} className="Comment">
							<span className="CommentID">{c._id}</span>
              <hr />
							<p>{c.body}</p>
						</li>
					))
				) : (
					<span>loading comments..</span>
				)}
			</ul>
		</div>
	);
};

export default Post;