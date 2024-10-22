import { setupActionMenu } from "./widgets/bar/action-menu/action-menu.js";
import { allMonitors } from "./utils.js";
import Bar from "./widgets/bar/bar.js";
import './variables.js';
import ClickCloseWindow from "./widgets/click-close-window.js";
import ShutdownMenu from "./widgets/bar/action-menu/shutdown-options.js";
import { NotificationPopups, Notifications } from "./widgets/bar/notifications.js";

let options = {
    'monitors': {
        'scaleMethod': "division", // Either "division" [default] or "gdk"
    },
}

globalThis['userOptions'] = options;

/*
Utils.timeout(100, () => Utils.notify({
    summary: "Notification Popup Example",
    iconName: "info-symbolic",
    body: "Lorem ipsum dolor sit amet, qui minim labore adipisicing "
        + "minim sint cillum sint consectetur cupidatat.",
    actions: {
        "Cool": () => print("pressed Cool"),
    },
}));
*/

App.config({
	onConfigParsed: () => {
		setupActionMenu();
		applyCss();
	},
    windows: () => [
        ClickCloseWindow(),
        ShutdownMenu,
        ...allMonitors(Bar),
    	NotificationPopups(),
	],
});

function applyCss() {
    // main scss file
    const scss = `${App.configDir}/style/main.scss`

    // target css file
    const css = `/tmp/style.css`

    // compile, reset, apply
    Utils.exec(`sassc ${scss} ${css}`)
    App.resetCss()
    App.applyCss(css);
}

Utils.monitorFile(
    `${App.configDir}/style`,
    applyCss,
);
