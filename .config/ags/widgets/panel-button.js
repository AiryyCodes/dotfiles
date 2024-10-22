export default ({
    child,
    ...other
}) => Widget.Button({
    child: Widget.Box({ child }),
    ...other
})
