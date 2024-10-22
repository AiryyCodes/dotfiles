export default (
    { name, child, margins = [0, 0, 0, 0], ...props },
) => {
    const window = Widget.Window({
        name: name,
		setup: w => w.keybind("Escape", () => App.closeWindow(name)),
		keymode: "on-demand",
        exclusivity: 'exclusive',
        visible: false,
        layer: 'top',
        anchor: ['top', 'right'],
        classNames: [name, 'popup-window'],
		margins: margins,
        child: child,
		...props,
    });

    return window;
};
