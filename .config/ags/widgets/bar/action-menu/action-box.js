const Network = await Service.import('network');
const Bluetooth = await Service.import('bluetooth');
const Audio = await Service.import('audio');

App.addIcons(`${App.configDir}/assets`);

const bluetooth = () => Widget.Icon({
    icon: Bluetooth.bind('enabled').as((on) => `bluetooth-${on ? 'active' : 'disabled'}-symbolic`),
});

const wifi = () => Widget.Icon({
    icon: Network[Network.primary || 'wifi']?.icon_name,
});

const audio = () => Widget.Icon().hook(Audio.speaker, self => {
    const vol = Audio.speaker.volume * 100;
    const icon = [
        [101, 'overamplified'],
        [67, 'high'],
        [34, 'medium'],
        [1, 'low'],
        [0, 'muted'],
        // @ts-ignore
    ].find(([threshold]) => threshold <= vol)?.[1];

    self.icon = `audio-volume-${icon}-symbolic`;
    self.tooltip_text = `Volume ${Math.floor(vol)}%`;
})

const actionBox = () => Widget.Box({
    className: 'action-box',
    spacing: 12,
    children: [
        audio(),
        bluetooth(),
        wifi(),
    ],
});

export default () => Widget.EventBox({
    onScrollUp: () => Audio.speaker.volume += 0.05,
    onScrollDown: () => Audio.speaker.volume -= 0.05,
    child: Widget.Button({
        className: 'action-bg',
        onPrimaryClick: (self) => {
            App.toggleWindow("click-close");
            App.toggleWindow("action-menu");
        },
        child: Widget.Box({
            child: actionBox(),
        }),
    }),
});
