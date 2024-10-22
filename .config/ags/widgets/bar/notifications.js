import PopupWindow from "../popup-window.js";

const notifications = await Service.import("notifications");

function NotificationIcon({ app_entry, app_icon, image }) {
    if (image) {
        return Widget.Box({
			className: 'notif-icon',
            css: `background-image: url("${image}");`
                + "background-size: contain;"
                + "background-repeat: no-repeat;"
                + "background-position: center;",
        })
    }

    let icon = "dialog-information-symbolic"
    if (Utils.lookUpIcon(app_icon))
        icon = app_icon

    if (app_entry && Utils.lookUpIcon(app_entry))
        icon = app_entry

    return Widget.Box({
        child: Widget.Icon(icon),
    })
}

export const Notification = (notif) => {

	const icon = Widget.Box({
        vpack: "start",
        class_name: "notif-icon",
        child: NotificationIcon(notif),
    })

	const title = Widget.Label({
		className: 'notif-title',
		label: notif.summary,
		justification: 'left',
    	//truncate: 'end',
    	xalign: 0,
    	maxWidthChars: 24,
    	wrap: true,
    	useMarkup: true,
	});


	const body = Widget.Label({
		className: 'notif-body',
		label: notif.body,
		justification: 'left',
    	//truncate: 'end',
    	xalign: 0,
    	maxWidthChars: 24,
    	wrap: true,
    	useMarkup: true,
	});

	const actions = Widget.Box({
        class_name: "notif-actions",
        children: notif.actions.map(({ id, label }) => Widget.Button({
            class_name: "notif-action-button",
            on_clicked: () => {
                notif.invoke(id)
                notif.dismiss()
            },
            hexpand: true,
            child: Widget.Label(label),
        })),
    });

	return Widget.EventBox({
			attribute: {
				id: notif.id
			},
        	on_primary_click: notif.dismiss,
			//className: 'notification',
		},
		Widget.Box({
			className: 'notification',
			vertical: true,
			//spacing: 12,
			children: [
				Widget.Box({
					//className: `notification ${notif.urgency}`,
					children: [
						icon,
						Widget.Box({
							vertical: true,
							children: [
								title,
								body,
							],	
						}),
					]
				}),
				actions,
			]
		}),
	);
}

export const Notifications = () => {

	const list = Widget.Box({
		//child: Widget.Label("Notifications"),
		vertical: true,
		spacing: 8,
		children: notifications.popups.map(Notification),
	});
	
	function onNotified(_, /** @type {number} */ id) {
        const n = notifications.getNotification(id)
        if (n)
            list.children = [Notification(n), ...list.children]
    }

    function onDismissed(_, /** @type {number} */ id) {
        list.children.find(n => n.attribute.id === id)?.destroy()
    }
	
	list.hook(notifications, onNotified, "notified")
        .hook(notifications, onDismissed, "dismissed")

	return Widget.Box({
		css: "min-width: 2px; min-height: 2px;",
        className: "notifications",
        vertical: true,
		child: list,
	});
}

export const NotificationPopups = () => Widget.Window({
	name: 'notifications',
	className: 'transparent',
	anchor: ['top', 'right'],
	margins: [8, 8, 0, 0],
	child: Notifications(),
});
