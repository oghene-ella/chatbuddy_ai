import robotImg from "../assets/robot.png"
import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate("/get-started");
    };

    return (
			<div className="hero bg-gray-900 h-full">
				<div className="hero-content flex-col-reverse md:flex-col lg:flex-row p-10 gap-10">
					<div className="text-center md:text-start">
						<h1 className="text-5xl font-bold text-white">
							Chat<b className="text-info">Buddy</b> AI!
						</h1>
						<p className="py-6 text-gray-100">
							ChatBuddy AI is a friendly and interactive chat application built
							with React JS, powered by Meta innovative Llama 3 family of
							large language models (LLMs). The application is optimized for
							helpfulness and safety, ensuring that users receive relevant and
							accurate information in a secure environment. Whether you are
							looking for a virtual assistant, customer support, or just a
							friendly conversation, ChatBuddy AI is here to help.
							<br />
							<br />
							With its ability to generate text and code based on user input,
							ChatBuddy AI demonstrates the power and versatility of modern AI
							technology. This project highlights the practical integration of
							advanced language models in a user-friendly web application,
							showcasing the potential of Llama 3 in creating meaningful and
							dynamic interactions.
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