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
                <BarBox halign={Gtk.Align.START}></BarBox>

                <BarBox halign={Gtk.Align.CENTER}>
                    <button>
                        <box spacing={12}>
                            {bind(hyprland, "workspaces").as((wss) => {
                                const filtered = wss
                                    .filter(
                                        (ws) => !(ws.id >= -99 && ws.id <= -2)
                                    )
                                    .sort((a, b) => a.id - b.id);

                                // create 10 slots
                                return Array.from({ length: 10 }, (_, i) => {
                                    const ws = filtered.find(
                                        (w) => w.id === i + 1
                                    );
                                    return <Workspace workspace={ws || null} />;
                                });
                            })}
                        </box>
                    </button>
                </BarBox>

                <BarBox halign={Gtk.Align.END}></BarBox>
            </centerbox>
        </window>
    );
}
