import { Link } from "react-router-dom";

const Login = () => {
	return (
		<div className="flex items-center justify-center min-h-screen">
			<div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
				<h2 className="text-2xl font-bold mb-6 text-center text-black">
					Log In
				</h2>
				<form>
					<div className="mb-4">
						<label className="block text-sm font-medium mb-2" htmlFor="email">
							Email
						</label>
						<input
							type="email"
							id="email"
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
							type="password"
							id="password"
							className="input input-info bg-transparent w-full"
							placeholder="Enter your password"
						/>
					</div>
					<button type="submit" className="btn btn-info font-semibold w-full">
						Login
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
			</div>
		</div>
	);
};

export default Login;
