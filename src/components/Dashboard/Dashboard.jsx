import { useState } from "react";
import Logout from "./Logout";
import { useAuth } from "../../context/authContext";
//import { getResponseFromLlama3 } from "../api";

const Dashboard = () => {
	const { currentUser } = useAuth();
	const [input, setInput] = useState("");
	const [response, setResponse] = useState("");

	// const handleSend = async () => {
	// 	const apiResponse = await getResponseFromLlama3(input);
	// 	setResponse(apiResponse);
	// };

	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-white">
			<div className="w-full max-w-lg p-4">
				<p className="text-black">
					Hello{" "}
					{currentUser.displayName ? currentUser.displayName : currentUser.email}
					, you are now logged in.
				</p>
				<h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
					Chat with ChatBuddy AI
				</h2>
				<textarea
					className="textarea textarea-bordered w-full mb-4"
					value={input}
					onChange={(e) => setInput(e.target.value)}
					placeholder="Type your message here..."
				></textarea>
				{/* <button onClick={handleSend} className="btn btn-primary w-full">
					Send
				</button> */}
				<div className="mt-4">
					<h3 className="text-lg font-semibold text-gray-700">Response:</h3>
					<p className="mt-2 p-4 bg-gray-100 rounded-lg">{response}</p>
				</div>

				<Logout />
			</div>
		</div>
	);
};

export default Dashboard;
