import PopupWindow from "../../popup-window.js";
import { Notifications } from "../notifications.js";
import { Header } from "./widgets/header.js";

const Notifs = () => {
	return Widget.Scrollable({
		hscroll: 'never',
		//vscroll: 'always',
		css: 'min-height: 300px;',
		className: 'action-notif-scrollable',
		child: Notifications(),
	})
}

const Content = () => Widget.Box({
	vertical: true,
	className: 'action-menu',
	children: [
		Header(),
		Notifs(),
	],
})

const ActionMenu = () => {
    return PopupWindow({
        name: 'action-menu',
		margins: [8, 8, 0, 0],
        child: Content(),	
	});
}

export function setupActionMenu() {
	App.addWindow(ActionMenu());
}

/*
 Widget.CenterBox({
            className: 'action-menu',
            vertical: true,
            startWidget: Widget.Box({
                child: Widget.CenterBox({
                    hexpand: true,
                    startWidget: Widget.Box({
                        children: [
                            Widget.Icon({
                                className: 'profile-pic',
                                icon: 'profile-pic',
                            }),
                            Widget.Label({
                                className: 'username-text',
                                label: username.getValue().charAt(0).toUpperCase() + username.getValue().slice(1),
                            }),
                        ],
                    }),
                    endWidget: Widget.Box({
                        hpack: 'end',
                        vpack: 'center',
                        children: [
                            Widget.Button({
                                className: 'power-button',
                                onPrimaryClick: (self) => {
                                    App.toggleWindow('shutdown-menu');
                                },
                                child: Widget.Icon({
                                    className: 'power-icon',
                                    icon: 'power-button',
                                }),
                            }),
                        ],
                    }),
                }),
            }),
            centerWidget: Widget.Box({
                vpack: 'start',
                children: [
                ],
            }),
            endWidget: Widget.Box({
                vpack: 'start',
                children: [
                ],
            }),
		}),
*/
