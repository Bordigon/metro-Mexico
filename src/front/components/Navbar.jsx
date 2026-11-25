import { Panel } from "@xyflow/react";

const Navbar = () => {

	return (
		<div>
			<button class="btn-solid theme-primary" type="button" data-bs-toggle="drawer" data-bs-target="#drawerScrolling" aria-controls="drawerScrolling">Calcular ruta</button>
			<dialog class="drawer drawer-start" data-bs-scroll="true" data-bs-backdrop="false" id="drawerScrolling" aria-labelledby="drawerScrollingLabel">
				<div class="drawer-header">
					<h5 class="drawer-title" id="drawerScrollingLabel">Opciones de viaje</h5>
					<button type="button" class="btn-close" data-bs-dismiss="drawer" aria-label="Close"></button>
				</div>
				<div class="drawer-body">
					<p>blablabla</p>
				</div>
			</dialog>
		</div>
	);
};

export default Navbar;