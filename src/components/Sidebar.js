import logo from "img/logo.svg"
import { Icon } from "Icons"
import Menu from "components/Sidebar/Menu"
import Playlists from "components/Sidebar/Playlists"
import DownloadApp from "components/Sidebar/DownloadApp"
import {useSelector} from "react-redux";
import SidebarCover from "./Sidebar/SidebarCover";

function Sidebar({ recentlyPlayed = [] }) {

	const sidebar = useSelector(state => state.player.sidebar)

	return (
		<aside className="w-60 h-screen pt-6 flex flex-shrink-0 flex-col glass">

			<a href="#" className="mb-7 px-6">
				<img src={logo} alt="Bollywood Music Logo" className="h-10"/>
			</a>

			<Menu />

			<nav className="mt-6">
				<ul>
					<li>
						<a href="#" className="py-2 px-6 flex items-center group text-sm text-link font-semibold hover:text-white">
							<span className="w-6 h-6 flex items-center justify-center mr-4 bg-white bg-opacity-60 group-hover:bg-opacity-100 rounded-sm text-black">
								<Icon name="plus" size={26} />
							</span>
							Create Bollywood Playlist
						</a>
					</li>
					<li>
						<a href="#" className="py-2 px-6 flex items-center group text-sm text-link font-semibold hover:text-white">
							<span className="w-6 h-6 flex items-center justify-center mr-4 bg-gradient-to-br from-purple-700 text-white rounded-sm to-blue-300 opacity-70 group-hover:opacity-100">
								<Icon name="heartFilled" size={26} />
							</span>
							Liked Bollywood Songs
						</a>
					</li>
				</ul>
			</nav>

			{/* Recently Played Section */}
			{recentlyPlayed.length > 0 && (
				<div className="sidebar-recently-played">
					<h4 className="text-link text-xs font-bold mb-2 tracking-wider uppercase">Recently Played</h4>
					<ul className="space-y-3">
						{recentlyPlayed.map(track => (
							<li key={track.trackId} className="flex items-center gap-3 bg-[#232323] rounded-lg p-2 hover:bg-[#2a2a2a] transition">
								<img src={track.artworkUrl60 || track.artworkUrl100} alt={track.trackName} className="w-10 h-10 rounded-md object-cover shadow" />
								<div className="flex flex-col overflow-hidden">
									<span className="text-sm text-white font-semibold truncate">{track.trackName}</span>
									<span className="text-xs text-link truncate">{track.artistName}</span>
								</div>
							</li>
						))}
					</ul>
				</div>
			)}

			{/* Only Playlists scrollable */}
			<div className="sidebar-scroll-area mt-4">
				<Playlists />
			</div>

			<DownloadApp />

			{sidebar && <SidebarCover />}

		</aside>
	)
}

export default Sidebar
