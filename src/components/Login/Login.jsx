import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import { signInEmailAndPassword, signInWithGoogle } from "../../firebase/auth";
import { useAuth } from "../../context/authContext/index";
import { toast } from "react-toastify";

const Login = () => {
	const { userLoggedIn } = useAuth();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isSigningIn, setIsSigningIn] = useState(false);

	const [errorMessage, setErrorMessage] = useState("");

	const onSubmit = async (e) => {
		e.preventDefault();
		setIsSigningIn(true);
		setErrorMessage("");

		try {
			await signInEmailAndPassword(email, password);
			toast.success("Logged in.");
		} catch (error) {
			setErrorMessage("Invalid login details. Please try again.");
			toast.error("Invalid Login details");
		} finally {
			setIsSigningIn(false);
		}
	};

	const onGoogleSignIn = async (e) => {
		e.preventDefault();
		setIsSigningIn(true);
		setErrorMessage("");

		try {
			await signInWithGoogle();
			toast.success("Google sign-in successful.");
		} catch (error) {
			setErrorMessage("Google sign-in failed. Please try again.");
			toast.error("Google sign-in failed");
		} finally {
			setIsSigningIn(false);
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-900">
			{userLoggedIn && <Navigate to={"/dashboard"} replace={true} />}
			<div className="bg-transparent border border-gray-800 p-10 rounded-xl shadow-xl w-full max-w-xl">
				<span className="text-center mb-10 flex flex-col gap-2">
					<h2 className="text-2xl font-bold text-white">Log In</h2>
					<p>Welcome Back 👋🏼</p>
				</span>
				<form onSubmit={onSubmit}>
					<div className="mb-4">
						<label className="block text-sm font-medium mb-2" htmlFor="email">
							Email
						</label>
						<input
							type="email"
							id="email"
							className="input input-info bg-transparent w-full"
							autoComplete="email"
							placeholder="Enter your email"
							value={email}
							onChange={(e) => {
								setEmail(e.target.value);
							}}
							required
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
							type="password"
							id="password"
							className="input input-info bg-transparent w-full"
							autoComplete="current-password"
							required
							value={password}
							onChange={(e) => {
								setPassword(e.target.value);
							}}
							placeholder="Enter your password"
						/>
					</div>
					{errorMessage && (
						<span className="text-red-500 text-sm font-medium">{errorMessage}</span>
					)}
					<button
						type="submit"
						disabled={isSigningIn}
						className={`btn btn-info font-semibold w-full mt-2 ${
							isSigningIn
								? "bg-gray-300 cursor-not-allowed"
								: "bg-info hover:bg-black hover:text-white hover:shadow-xl transition duration-300"
						}`}
					>
						{isSigningIn ? "Signing In..." : "Log In"}
					</button>
				</form>

				<div className="mt-6 text-center">
					<p className="text-sm">
						Do not have an account?{" "}
						<Link to="/get-started" className="text-info hover:underline">
							Sign Up
						</Link>
					</p>
				</div>

				<button
					disabled={isSigningIn}
					onClick={(e) => {
						onGoogleSignIn(e);
					}}
					className={`w-full flex items-center justify-center gap-x-3 py-2.5 border rounded-lg text-sm font-medium mt-5 ${
						isSigningIn
							? "cursor-not-allowed"
							: "hover:bg-gray-100 transition duration-300 active:bg-gray-100 hover:text-black"
					}`}
				>
					<svg
						className="w-5 h-5"
						viewBox="0 0 48 48"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<g clipPath="url(#clip0_17_40)">
							<path
								d="M47.532 24.5528C47.532 22.9214 47.3997 21.2811 47.1175 19.6761H24.48V28.9181H37.4434C36.9055 31.8988 35.177 34.5356 32.6461 36.2111V42.2078H40.3801C44.9217 38.0278 47.532 31.8547 47.532 24.5528Z"
								fill="#4285F4"
							/>
							<path
								d="M24.48 48.0016C30.9529 48.0016 36.4116 45.8764 40.3888 42.2078L32.6549 36.2111C30.5031 37.675 27.7252 38.5039 24.4888 38.5039C18.2275 38.5039 12.9187 34.2798 11.0139 28.6006H3.03296V34.7825C7.10718 42.8868 15.4056 48.0016 24.48 48.0016Z"
								fill="#34A853"
							/>
							<path
								d="M11.0051 28.6006C9.99973 25.6199 9.99973 22.3922 11.0051 19.4115V13.2296H3.03298C-0.371021 20.0112 -0.371021 28.0009 3.03298 34.7825L11.0051 28.6006Z"
								fill="#FBBC04"
							/>
							<path
								d="M24.48 9.49932C27.9016 9.44641 31.2086 10.7339 33.6866 13.0973L40.5387 6.24523C36.2 2.17101 30.4414 -0.068932 24.48 0.00161733C15.4055 0.00161733 7.10718 5.11644 3.03296 13.2296L11.005 19.4115C12.901 13.7235 18.2187 9.49932 24.48 9.49932Z"
								fill="#EA4335"
							/>
						</g>
						<defs>
							<clipPath id="clip0_17_40">
								<rect width="48" height="48" fill="white" />
							</clipPath>
						</defs>
					</svg>
					{isSigningIn ? "Signing In..." : "Continue with Google"}
				</button>
			</div>
		</div>
	);
};

export default Login;
