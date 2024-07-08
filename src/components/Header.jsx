import robotImg from "../assets/onee.png"
const Header = () => {
  return (
		<div className="hero bg-base-200 min-h-screen">
			<div className="hero-content flex-col lg:flex-row">
				<div>
					<h1 className="text-5xl font-bold">NewsNow AI!</h1>
					<p className="py-6">
						By leveraging the power of Alan AI, this application curates and delivers
						personalized news content from various sources, ensuring that users
						receive the most relevant and timely information.
					</p>
					<button className="btn btn-info">Get Started</button>
				</div>
				<img src={robotImg} className="max-w-4xl" />
			</div>
		</div>
	);
}

export default Header