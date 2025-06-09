import { App, Astal, Gtk, Gdk } from "astal/gtk3";
import { Variable, bind } from "astal";
import Hyprland from "gi://AstalHyprland";

import BarBox from "./BarBox";
import Workspace from "./Workspace";

const time = Variable("").poll(1000, "date");

export default function Bar(gdkmonitor: Gdk.Monitor) {
    const { TOP, LEFT, RIGHT } = Astal.WindowAnchor;

    const hyprland = Hyprland.get_default();

    return (
        <window
            className="Bar"
            gdkmonitor={gdkmonitor}
            exclusivity={Astal.Exclusivity.EXCLUSIVE}
            anchor={TOP | LEFT | RIGHT}
            application={App}
            marginBottom={-8}
        >
            <centerbox>
                <BarBox halign={Gtk.Align.START} spacing={4}>
                    {bind(hyprland, "workspaces").as((wss) =>
                        wss
                            .filter((ws) => !(ws.id >= -99 && ws.id <= -2)) // filter out special workspaces
                            .sort((a, b) => a.id - b.id)
                            .map((workspace) => (
                                <Workspace workspace={workspace} />
                            ))
                    )}
                </BarBox>

                <BarBox halign={Gtk.Align.CENTER}>
                    <label>Center</label>
                </BarBox>

                <BarBox halign={Gtk.Align.END}>
                    <label>Right</label>
                </BarBox>
            </centerbox>
        </window>
    );
}
