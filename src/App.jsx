import {
	BrowserRouter as Router,
	Route,
	Routes,
	useLocation,
} from "react-router-dom";
import Header from "./components/Header";
import SignUp from "./SignUp";
import Footer from "./components/Footer";
import Login from "./Login";

const MainContent = () => {
	const location = useLocation();

	return (
		<div className="flex flex-col h-screen">
			<div className="flex-grow">
				<Routes>
					<Route path="/" element={<Header />} />
					<Route path="/get-started" element={<SignUp />} />
					<Route path="/login" element={<Login />} />
				</Routes>
			</div>
			{location.pathname === "/" && <Footer />}
		</div>
	);
};

const App = () => {
	return (
		<Router>
			<MainContent />
		</Router>
	);
};

export default App;
