import { useState, useEffect } from "react";
import Logout from "./Logout";
import { useAuth } from "../../context/authContext";
import axios from "axios";
import { FaBars, FaTimes, FaPlus, FaPaperPlane } from "react-icons/fa";
import { db } from "../../firebase/config";
import { collection, doc, setDoc, getDocs } from "firebase/firestore";

const Dashboard = () => {
	const { currentUser } = useAuth();
	const [input, setInput] = useState("");
	const [chatSessions, setChatSessions] = useState([]);
	const [activeChatId, setActiveChatId] = useState(null);
	const [sidebarOpen, setSidebarOpen] = useState(true);

	useEffect(() => {
		const loadChatSessions = async () => {
			try {
				const userChatsRef = collection(
					db,
					"users",
					currentUser.uid,
					"chatSessions",
				);
				const snapshot = await getDocs(userChatsRef);
				const loadedChatSessions = snapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));
				setChatSessions(loadedChatSessions);
			} catch (error) {
				console.error("Error loading chat sessions: ", error);
			}
		};

		loadChatSessions();
	}, [currentUser.uid]);

	const saveChatSession = async (chatId, chatData) => {
		try {
			// Ensure no undefined values are being set
			const sanitizedData = JSON.parse(JSON.stringify(chatData)); // Convert to JSON and back to remove undefined
			const userChatRef = doc(
				db,
				"users",
				currentUser.uid,
				"chatSessions",
				chatId,
			);
			await setDoc(userChatRef, sanitizedData);
		} catch (error) {
			console.error("Error saving chat session: ", error);
		}
	};


	const handleSend = async () => {
		if (input.trim() === "") return;

		let newChatId = activeChatId;
		if (activeChatId === null) {
			newChatId = (chatSessions.length + 1).toString();
			const newChat = {
				name: input.split(" ").slice(0, 3).join(" "),
				messages: [{ role: "user", content: input }],
			};
			setChatSessions([...chatSessions, { id: newChatId, ...newChat }]);
			setActiveChatId(newChatId);
			await saveChatSession(newChatId, newChat);

			try {
				const response = await axios.post(
					"https://api-inference.huggingface.co/models/meta-llama/Meta-Llama-3-8B-Instruct",
					{ inputs: input },
					{
						headers: {
							Authorization: `Bearer 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`,
						},
					},
				);
				const assistantMessage = {
					role: "assistant",
					content: response.data.generated_text,
				};
				const updatedChat = {
					...newChat,
					messages: [...newChat.messages, assistantMessage],
				};
				setChatSessions((prevSessions) =>
					prevSessions.map((chat) =>
						chat.id === newChatId
							? { ...chat, messages: updatedChat.messages }
							: chat,
					),
				);
				await saveChatSession(newChatId, updatedChat);
			} catch (error) {
				console.error("Error fetching AI response: ", error);
			}
		} else {
			const userMessage = { role: "user", content: input };
			const updatedChat = chatSessions.find((chat) => chat.id === activeChatId);
			updatedChat.messages.push(userMessage);
			setChatSessions((prevSessions) =>
				prevSessions.map((chat) =>
					chat.id === activeChatId ? updatedChat : chat,
				),
			);

			try {
				const response = await axios.post(
					"https://api-inference.huggingface.co/models/meta-llama/Meta-Llama-3-8B-Instruct",
					{ inputs: input },
					{
						headers: {
							Authorization: `Bearer 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`,
						},
					},
				);
				const assistantMessage = {
					role: "assistant",
					content: response.data.generated_text,
				};
				updatedChat.messages.push(assistantMessage);
				setChatSessions((prevSessions) =>
					prevSessions.map((chat) =>
						chat.id === activeChatId ? updatedChat : chat,
					),
				);
				await saveChatSession(activeChatId, updatedChat);
			} catch (error) {
				console.error("Error fetching AI response: ", error);
			}
		}

		setInput("");
	};

	const handleKeyDown = (e) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSend();
		}
	};

	const addNewChat = () => {
		setActiveChatId(null);
		setInput("");
	};

	const switchChat = (id) => {
		setActiveChatId(id);
	};

	const activeChat = chatSessions.find((chat) => chat.id === activeChatId);

	return (
		<div className="flex h-screen bg-gray-200">
			{/* Sidebar */}
			<div
				className={`fixed top-0 left-0 h-full bg-white shadow-lg transition-transform duration-300 ${
					sidebarOpen ? "translate-x-0" : "-translate-x-full"
				} w-72`}
			>
				<button
					onClick={() => setSidebarOpen(false)}
					className="absolute top-4 right-4 p-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600"
				>
					<FaTimes size={20} />
				</button>
				<div className="p-4">
					<h3 className="text-lg font-semibold text-gray-700 mb-4">
						New Topics
					</h3>
					<button
						onClick={addNewChat}
						className="w-full bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 mb-4 flex items-center justify-center"
					>
						<FaPlus size={20} />
					</button>
					{chatSessions.map((chat) => (
						<div key={chat.id} className="mb-2">
							<button
								onClick={() => switchChat(chat.id)}
								className={`w-full py-2 px-4 rounded-md text-left ${
									chat.id === activeChatId
										? "bg-blue-500 text-white"
										: "bg-gray-200 text-gray-900"
								}`}
							>
								{chat.name}
							</button>
						</div>
					))}
				</div>
			</div>
			{/* Main Content */}
			<div
				className={`flex-1 p-6 transition-transform duration-300 ${
					sidebarOpen ? "ml-72" : "ml-12"
				}`}
			>
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-2xl font-bold text-gray-800">
						Chat with ChatBuddy AI
					</h2>
					<div className="flex items-center">
						<p className="text-gray-600 mr-4">
							{currentUser.displayName
								? currentUser.displayName
								: currentUser.email}
						</p>
						<Logout />
					</div>
				</div>
				<div className="w-full h-96 overflow-y-scroll border rounded-md bg-white p-4 shadow-md">
					{activeChat &&
						activeChat.messages.map((msg, index) => (
							<div
								key={index}
								className={`mb-4 ${
									msg.role === "user" ? "text-right" : "text-left"
								}`}
							>
								<div
									className={`inline-block p-2 rounded-md ${
										msg.role === "user"
											? "bg-blue-500 text-white"
											: "bg-gray-200 text-gray-900"
									}`}
								>
									{msg.content}
								</div>
							</div>
						))}
				</div>
				<div className="mt-4 flex gap-4 justify-center items-center bg-slate-900 rounded-xl pr-5">
					<textarea
						className="w-full p-2 rounded-l-md bg-transparent ml-3"
						rows="2"
						value={input}
						onChange={(e) => setInput(e.target.value)}
						onKeyDown={handleKeyDown}
						placeholder="Type your message here..."
					></textarea>
					<button
						onClick={handleSend}
						className="w-fit h-fit bg-blue-500 text-white p-4 rounded-full hover:bg-blue-600 flex items-center justify-center"
					>
						<FaPaperPlane size={16} />
					</button>
				</div>
			</div>
			{/* Sidebar Toggle Button */}
			{!sidebarOpen && (
				<button
					onClick={() => setSidebarOpen(true)}
					className="fixed top-6 left-4 p-3 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600"
				>
					<FaBars size={24} />
				</button>
			)}
		</div>
	);
};

export default Dashboard;
