import { Gtk } from "astal/gtk3";

type Props = {
    halign: Gtk.Align;
    spacing?: number;
    children?: Gtk.Widget[];
    child?: Gtk.Widget;
};

export default function BarBox({ halign, spacing, child, children }: Props) {
    return (
        <box halign={halign} spacing={spacing} className="BarBox">
            {child}
            {children}
        </box>
    );
}
