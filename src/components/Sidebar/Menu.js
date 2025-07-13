import { Icon } from 'Icons';
import { NavLink } from 'react-router-dom';

function Menu() {
	return (
		<nav className="px-2">
			<ul className="flex flex-col">
				<li>
					<NavLink activeClassName="bg-active text-white" exact to={"/"} className="h-10 flex gap-x-4 items-center text-sm font-semibold text-link rounded hover:text-white px-4">
						<span>
							<Icon name="home" />
						</span>
						Bollywood Home
					</NavLink>
				</li>
				<li>
					<NavLink activeClassName="bg-active text-white" to={"/search"} className="h-10 flex gap-x-4 items-center text-sm font-semibold text-link rounded hover:text-white px-4">
						<span>
							<Icon name="search" />
						</span>
						Bollywood Search
					</NavLink>
				</li>
				<li>
					<NavLink activeClassName="bg-active text-white" to={"/collection"} className="h-10 flex gap-x-4 items-center text-sm font-semibold text-link rounded hover:text-white px-4">
						<span>
							<Icon name="collection" />
						</span>
						Bollywood Collection
					</NavLink>
				</li>
			</ul>
		</nav>
	)
}

export default Menu