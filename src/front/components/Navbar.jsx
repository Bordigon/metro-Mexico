import { Panel } from "@xyflow/react";

const Navbar = () => {

	return (
		<div>
			<Panel position="center-left" style={{
				top: '50vh',
				left: '20px',
				width: '100px',
				backgroundColor: 'lightgreen',
				borderRadious: '100%'
			}}>
				top-left
			</Panel>
		</div>
	);
};

export default Navbar;