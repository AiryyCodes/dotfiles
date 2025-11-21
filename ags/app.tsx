import { createBinding, For, This } from "ags";
import app from "ags/gtk4/app";
import style from "./style.scss";
import Bar from "./widget/Bar/Bar";
import { Gtk } from "ags/gtk4";
import Applauncher from "./widget/AppLauncher";

let applauncher: Gtk.Window;

app.start({
  css: style,
  gtkTheme: "Adwaita",
  requestHandler(argv, res) {
    switch (argv[0]) {
      case "toggle":
        applauncher.visible = !applauncher.visible;
        return res("ok");
      default:
        return res("unknown command");
    }
  },
  main() {
    applauncher = Applauncher() as Gtk.Window;

    const monitors = createBinding(app, "monitors");

    return (
      <For each={monitors}>
        {(monitor) => (
          <This this={app}>
            <Bar gdkmonitor={monitor} />
          </This>
        )}
      </For>
    );
  },
});
