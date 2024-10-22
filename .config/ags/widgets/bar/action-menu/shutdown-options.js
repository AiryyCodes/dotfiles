import PopupWindow from "../../popup-window.js";

const ShutdownMenu = PopupWindow({
    name: 'shutdown-menu',
	margins: [76, 20, 0, 0],
    child: Widget.Box({
        className: 'shutdown-menu',
        vertical: true,
        spacing: 8,
        children: [
            Widget.Button({
                className: 'shutdown-button',
                child: Widget.Label({
					justification: 'left',
    				xalign: 0,
                    label: 'Shutdown',
                }),
                onPrimaryClick: () => Utils.exec('shutdown now'),
            }),
            Widget.Button({
                className: 'shutdown-button',
                child: Widget.Label({
					justification: 'left',
    				xalign: 0,
					label: 'Restart',
                }),
                onPrimaryClick: () => Utils.exec('reboot'),
            }),
            Widget.Button({
                className: 'shutdown-button',
                child: Widget.Label({
                    justification: 'left',
					xalign: 0,
                    label: 'Sleep',
                }),
                onPrimaryClick: () => Utils.exec('systemctl suspend'),
            }),
        ],
    }),
});

export default ShutdownMenu;
