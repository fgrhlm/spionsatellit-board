import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import IPost from "../interfaces/IPost";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { FindPosts } from "../redux/thunks";
import { incrementOffset, decrementOffset } from "../redux/slices/feedSlice";
import { Link, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const Feed = (): JSX.Element => {
  let navigate = useNavigate();
	const dispatch = useAppDispatch();
	const posts: IPost[] = useAppSelector((state) => state.feed.posts);
  const offset: number = useAppSelector((state) => state.feed.offset);

  useEffect(() => {
		dispatch(FindPosts(offset));
	}, [offset]);

  useEffect(()=>{
    if (!Cookies.get("token")) {
			navigate("/");
		}
  },[])

	return (
		<>
			<ul className="Feed">
				{posts.length > 0 ? (
					posts.map((i: IPost) => (
						<li key={i._id}>
							<Link to={`/post/${i._id}`}>{i.title}</Link>
						</li>
					))
				) : (
					<span>loading posts..</span>
				)}
			</ul>
			<div id="navigate">
				<button
					onClick={() => {
						dispatch(decrementOffset());
					}}
				>
					newer
				</button>
        {posts.length > 24 &&
          <button
            onClick={() => {
              dispatch(incrementOffset());
            }}
          >
            older
          </button>
        }
			</div>
		</>
	);
};

export default Feed;