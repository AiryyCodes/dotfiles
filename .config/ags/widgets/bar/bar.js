import Workspaces from './workspaces.js';
import Time from './time.js';
import ActionBox from './action-menu/action-box.js';

function Bar(monitor = 0) {
    return Widget.Window({
        monitor,
        className: 'transparent',
        name: `bar-${monitor}`,
        anchor: ['top', 'left', 'right'],
        exclusivity: "exclusive",
        child: Widget.CenterBox({
            className: 'bar-box',
            startWidget: Widget.Box({
                hexpand: true,
                children: [
                    Workspaces(),
                ],
            }),
            centerWidget: Widget.Box({
                hpack: "center",
                children: [
                    Time(),
                ],
            }),
            endWidget: Widget.Box({
                hpack: "end",
                children: [
                    ActionBox(),
                ],
            }),
        }),
    });
}

export default Bar;