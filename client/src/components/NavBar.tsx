import { Link } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";

const NavBar = (): JSX.Element => {
	const loggedIn: boolean = useAppSelector((state) => state.login.loggedIn);
	const token: string = useAppSelector((state) => state.login.token);

	return (
		<div className="NavBar">
			<a href="https://spionsatellit.com">
				<span className="NavBrand">spionsatellit</span>
			</a>
			{(token.length > 1 && loggedIn) && (
				<div className="NavItems">
					<Link to="/rules" className="NavItem">
						Rules
					</Link>
					<Link to="/submit" className="NavItem">
						Submit
					</Link>
          <Link to="/logout" className="NavItem">
            Logout
          </Link>
				</div>
			)}
		</div>
	);
};

export default NavBar;