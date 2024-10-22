export default () => {
    return Widget.Window({
        name: 'click-close',
        anchor: ['top', 'bottom', 'left', 'right'],
        exclusivity: 'ignore',
        visible: false,
        className: 'transparent',
        child: Widget.Button({
            className: 'transparent',
            onClicked: (self) => {
                App.closeWindow('click-close');
                App.closeWindow('action-menu');
                App.closeWindow('shutdown-menu');
            },
        }),
    });
}