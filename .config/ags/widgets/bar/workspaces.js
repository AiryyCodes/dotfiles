import { visibleWorkspaces } from "../../user-config.js";
import { range, sh } from "../../utils.js";
import PanelButton from "../panel-button.js";

const hyprland = await Service.import("hyprland")

const dispatch = (workspace) => {
    sh(`hyprctl dispatch workspace ${workspace}`)
}

const Workspaces = (workspaces) => Widget.Box({
    children: range(workspaces, 1).map(i => Widget.Label({
        attribute: i,
        vpack: "center",
        label: `${i}`,
        className: "workspace-btn",
        setup: self => self.hook(hyprland, () => {
            self.toggleClassName("active", hyprland.active.workspace.id == i)
        })
    })),
})

const workspaces = visibleWorkspaces;

export default () => PanelButton({
    child: workspaces.bind().as(Workspaces),
    className: "workspaces"
});
