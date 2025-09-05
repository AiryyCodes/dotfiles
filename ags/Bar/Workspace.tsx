import { Gtk } from "astal/gtk3";
import { bind } from "astal";
import Hyprland from "gi://AstalHyprland";
import Apps from "gi://AstalApps";

type Props = {
    workspace?: Hyprland.Workspace | null;
};

export default function Workspace({ workspace }: Props) {
    const apps = new Apps.Apps();

    return (
        <box>
            {workspace ? (
                bind(workspace, "clients").as((clients) =>
                    clients.length > 0 ? (
                        <box
                            className={bind(
                                Hyprland.get_default(),
                                "focusedWorkspace"
                            ).as((focused) =>
                                focused?.id == workspace.id
                                    ? "WorkspaceActive"
                                    : "Workspace"
                            )}
                            spacing={4}
                            widthRequest={16}
                            halign={Gtk.Align.FILL}
                            valign={Gtk.Align.CENTER}
                        >
                            <icon
                                icon={
                                    apps.exact_query(
                                        workspace.clients[0].class
                                    )[0].iconName
                                }
                            />
                        </box>
                    ) : (
                        <box
                            className={bind(
                                Hyprland.get_default(),
                                "focusedWorkspace"
                            ).as((focused) =>
                                focused?.id == workspace.id
                                    ? "WorkspaceEmptyActive"
                                    : "WorkspaceEmpty"
                            )}
                        ></box>
                    )
                )
            ) : (
                <box className="WorkspaceEmpty"></box>
            )}
        </box>
    );
}
