const hyprland = await Service.import("hyprland")

const dateOptions1 = new Intl.DateTimeFormat(undefined, {
    minute: "2-digit",
    hour: "2-digit",
    hour12: false
})

const dateOptions2 = new Intl.DateTimeFormat(undefined, {
    day: "numeric",
    month: "numeric"
})

const date = Variable("", {
    poll: [1000, () => {
        const date = new Date();
        return `${dateOptions1.format(date)} • ${dateOptions2.format(date)}`
    }]
})

export default () => Widget.Button({
    child: Widget.Label({
        label: date.bind(),
        className: "date-text",
    }),
    className: "date"
})