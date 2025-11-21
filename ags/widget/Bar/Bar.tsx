import app from "ags/gtk4/app";
import { Astal, Gdk, Gtk } from "ags/gtk4";
import {
    Accessor,
    createBinding,
    createComputed,
    createState,
    onCleanup,
    With,
} from "gnim";
import AstalHyprland from "gi://AstalHyprland?version=0.1";
import { range } from "../../utils";
import AstalWp from "gi://AstalWp?version=0.1";
import { Object } from "gnim/gobject";

function WorkspaceButton({
    workspace,
}: {
    workspace: AstalHyprland.Workspace;
}) {
    const hyprland = AstalHyprland.get_default();
    const classNames = createComputed(
        [
            createBinding(hyprland, "focusedWorkspace"),
            createBinding(hyprland, "clients"),
        ],
        (fws) => {
            const classes = ["workspace-button"];

            const active = fws.id == workspace.id;
            active && classes.push("active");

            const occupied =
                hyprland.get_workspace(workspace.id)?.get_clients().length > 0;
            occupied && classes.push("occupied");
            return classes;
        },
    );

    return (
        <box
            valign={Gtk.Align.CENTER}
            halign={Gtk.Align.CENTER}
            cssClasses={classNames}
        ></box>
    );
}

function Workspaces() {
    return (
        <button>
            <box spacing={4}>
                {range(9).map((i) => (
                    <WorkspaceButton
                        workspace={AstalHyprland.Workspace.dummy(i + 1, null)}
                    />
                ))}
            </box>
        </button>
    );
}

function VolumeStatus({
    endpoint,
    icon,
}: {
    endpoint: AstalWp.Endpoint | null;
    icon?: string | Accessor<string>;
}) {
    const maxVolume = 100;

    function increaseEndpointVolume(
        endpoint: AstalWp.Endpoint | null,
        volumeIncrease: number,
    ): void {
        if (!endpoint) return;

        volumeIncrease = Math.abs(volumeIncrease) / 100;

        if (endpoint.get_volume() + volumeIncrease > maxVolume / 100) {
            endpoint.set_volume(1.0);
            return;
        }

        endpoint.set_volume(endpoint.get_volume() + volumeIncrease);
    }

    function decreaseEndpointVolume(
        endpoint: AstalWp.Endpoint | null,
        volumeDecrease: number,
    ): void {
        if (!endpoint) return;

        volumeDecrease = Math.abs(volumeDecrease) / 100;

        if (endpoint.get_volume() - volumeDecrease < 0) {
            endpoint.set_volume(0);
            return;
        }

        endpoint.set_volume(endpoint.get_volume() - volumeDecrease);
    }

    return (
        <box spacing={2}>
            {icon && <image iconName={icon} />}
            <label
                label={createBinding(endpoint!, "volume").as(
                    (vol) => `${Math.floor(vol * 100)}%`,
                )}
            />
        </box>
    );
}

export default function Bar({ gdkmonitor }: { gdkmonitor: Gdk.Monitor }) {
    let win: Astal.Window;
    const { TOP, LEFT, RIGHT } = Astal.WindowAnchor;

    onCleanup(() => {
        win.destroy();
    });

    const [show, setShow] = createState(true);

    /*
    setTimeout(() => {
        setShow(true);
    }, 50);
    */

    const wireplumber = AstalWp.get_default();

    return (
        <window
            $={(self) => (win = self)}
            visible
            namespace="my-bar"
            name="bar"
            gdkmonitor={gdkmonitor}
            exclusivity={Astal.Exclusivity.EXCLUSIVE}
            anchor={TOP | LEFT | RIGHT}
            application={app}
        >
            <centerbox>
                <box $type="start"></box>
                <box $type="center">
                    <Workspaces />
                </box>
                §
                <box $type="end">
                    <button>
                        <VolumeStatus
                            endpoint={wireplumber!.get_default_speaker()}
                            icon={createBinding(
                                wireplumber!.get_default_speaker()!,
                                "volumeIcon",
                            ).as((icon) =>
                                !wireplumber
                                    ?.get_default_speaker()
                                    ?.get_mute() &&
                                wireplumber!.get_default_speaker()!.volume > 0
                                    ? icon
                                    : "audio-volume-muted-symbolic",
                            )}
                        />
                    </button>
                </box>
            </centerbox>
        </window>
    );
}
