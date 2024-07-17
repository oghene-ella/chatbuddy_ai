import { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { useAuth } from "../../context/authContext/index";
import { createEmailandPassword } from "../../firebase/auth";

const SignUp = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isRegistering, setIsRegistering] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	const { userLoggedIn } = useAuth();

	const onSubmit = async (e) => {
		e.preventDefault();
		if (!isRegistering) {
			setIsRegistering(true);
			await createEmailandPassword(email, password);
			setErrorMessage('Email already registered')
		}
	};
	return (
		<>
			{userLoggedIn && <Navigate to={"/login"} replace={true} />}
			<div className="flex items-center justify-center min-h-screen bg-gray-900">
				<div className="bg-transparent border border-gray-800 p-10 rounded-xl shadow-xl w-full max-w-xl">
					<span className="text-center mb-10 flex flex-col gap-2">
						<h2 className="text-2xl font-bold text-white">Sign Up</h2>
						<p>Welcome to ChatBuddy AI</p>
					</span>
					<form onSubmit={onSubmit}>
						<div className="mb-4">
							<label className="block text-sm font-medium mb-2" htmlFor="name">
								Full Name
							</label>
							<input
								type="text"
								id="name"
								className="input input-info bg-transparent w-full"
								placeholder="Enter your full name"
							/>
						</div>
						<div className="mb-4">
							<label className="block text-sm font-medium mb-2" htmlFor="email">
								Email
							</label>
							<input
								type="email"
								id="email"
								autoComplete="email"
								required
								value={email}
								onChange={(e) => {
									setEmail(e.target.value);
								}}
								className="input input-info bg-transparent w-full"
								placeholder="Enter your email"
							/>
						</div>
						<div className="mb-4">
							<label
								className="block text-sm font-medium mb-2"
								htmlFor="password"
							>
								Password
							</label>
							<input
								disabled={isRegistering}
								type="password"
								autoComplete="new-password"
								required
								value={password}
								onChange={(e) => {
									setPassword(e.target.value);
								}}
								id="password"
								className="input input-info bg-transparent w-full"
								placeholder="Enter your password"
							/>
						</div>
						{errorMessage && (
							<span className="text-red-600 font-bold">{errorMessage}</span>
						)}
						<button
							type="submit"
							disabled={isRegistering}
							className={`btn btn-info font-semibold w-full ${
								isRegistering
									? "bg-gray-300 cursor-not-allowed"
									: "bg-info hover:bg-black hover:text-white hover:shadow-xl transition duration-300"
							}`}
						>
							{isRegistering ? "Signing Up..." : "Sign Up"}
						</button>
					</form>
					<div className="mt-6 text-center">
						<p className="text-sm">
							Already have an account?{" "}
							<Link to="/login" className="text-info hover:underline">
								Log In
							</Link>
						</p>
					</div>
				</div>
			</div>
		</>
	);
};

export default SignUp;
