import robotImg from "../assets/robot.png"
import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate("/get-started");
    };

    return (
			<div className="hero bg-base-200 h-full">
				<div className="hero-content flex-col-reverse md:flex-col lg:flex-row p-10 gap-10">
					<div className="text-center md:text-start">
						<h1 className="text-5xl font-bold">NewsNow AI!</h1>
						<p className="py-6">
							By leveraging the power of Alan AI, this application curates and
							delivers personalized news content from various sources, ensuring
							that users receive the most relevant and timely information.
						</p>
						<button className="btn btn-info" onClick={handleGetStarted}>
							Get Started
						</button>
					</div>
					<img src={robotImg} className="min-w-4xl" />
				</div>
			</div>
		);
}

export default Header