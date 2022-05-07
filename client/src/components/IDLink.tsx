import { Link } from "react-router-dom";

type IDLinkProps = {
  id: string,
  isComment?: boolean
}

const IDLink = ({ id, isComment }: IDLinkProps): JSX.Element => {
	const href: string = isComment ? `/comment/${id}` : `/post/${id}`;
	return (
		<div className="IDLink">
			<Link to={href} className="IdTag">
				{id}
			</Link>
		</div>
	);
};

export default IDLink;