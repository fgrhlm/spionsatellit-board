const Rules = (): JSX.Element => {
	return (
		<div className="Rules">
			<h4>Hard rules</h4>
			<ul>
				<li>
					<p>
						<b className="red text-black">
							<u>Absolutely no illegal content.</u>
						</b>{" "}
						Violations of this rule will be reported to the authorities (krp).
					</p>
				</li>
				<li>Argumenting is fine, being rude is not.</li>
				<li>No doxxing.</li>
			</ul>
			<h4>Soft rules</h4>
			<ul>
				<li>Don't repost</li>
				<li>Don't use a URL as the title of a post</li>
				<li>"this ^" is not a worthy comment</li>
			</ul>
		</div>
	);
};

export default Rules;