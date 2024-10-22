import { Avatar } from "./avatar.js";

const ActionButton = (icon, onClick) => Widget.Button({
	className: 'action-button',
	vpack: 'center',
	onPrimaryClick: onClick,
	child: Widget.Icon({
		className: 'action-icon',
		icon: icon,
	})
})

export const Header = () => Widget.Box({
	className: 'header',
	spacing: 8,
	children: [
		Avatar(),
		Widget.Box({
			hexpand: true,
		}),
		ActionButton("emblem-system-symbolic", () => {
			
		}),
		ActionButton("system-log-out-symbolic", () => {
			
		}),
		ActionButton("system-shutdown-symbolic", () => {
			App.toggleWindow('shutdown-menu');
		}),
	]
})
