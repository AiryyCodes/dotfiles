import { App, Gtk } from "astal/gtk3";
import { Variable, bind } from "astal";
import Hyprland from "gi://AstalHyprland";
import Apps from "gi://AstalApps";

type Props = {
    workspace: Hyprland.Workspace;
};

export default function Workspace({ workspace }: Props) {
    const apps = new Apps.Apps();

    const width = Variable(0);

    return (
        <box className="Workspace" spacing={4} widthRequest={width((w) => w)}>
            <label>{workspace.id}</label>
            {bind(workspace, "clients").as((clients) => {
                const base = 32;
                const perClient = 1;
                width.set(base + clients.length);
                return clients.map((client) => (
                    <icon
                        icon={apps.exact_query(client.class)[0].iconName}
                    ></icon>
                ));
            })}
        </box>
    );
}
