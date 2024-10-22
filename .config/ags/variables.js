import Gdk from "gi://Gdk";

const range = (length, start = 1) => Array.from({ length }, (_, i) => i + start);
globalThis['closeWindowOnAllMonitors'] = (name) => {
    range(Gdk.Display.get_default()?.get_n_monitors() || 1, 0).forEach(id => {
        App.closeWindow(`${name}${id}`);
    });
}

globalThis['closeEverything'] = (name) => {
    App.closeWindow(name);
};