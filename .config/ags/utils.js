import Gdk from "gi://Gdk"

export async function sh(cmd) {
    return Utils.execAsync(cmd).catch(err => {
        console.error(typeof cmd === "string" ? cmd : cmd.join(" "), err)
        return ""
    })
}

export function range(length, start = 1) {
    return Array.from({ length }, (_, i) => i + start)
}

export function allMonitors(widget) {
    const numMonitors = Gdk.Display.get_default()?.get_n_monitors() || 1;
    return range(numMonitors, 0).flatMap(widget);
}