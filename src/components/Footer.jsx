import icon from "../assets/icon.png"
const Footer = () => {
    return (
			<footer className="footer footer-center bg-info text-base-300 p-4">
				<aside className="grid-flow-col items-center">
					<img src={icon} className="w-10 border border-white rounded-full p-1 bg-white" />
					<p className="font-semibold">
						Copyright © ${new Date().getFullYear()} - All right reserved by ChatBuddy AI
					</p>
				</aside>
			</footer>
		);
}

export default Footer