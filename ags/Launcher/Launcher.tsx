import { App, Astal, Gtk, Gdk, Widget } from "astal/gtk3";
import { Variable } from "astal";
import Apps from "gi://AstalApps";

const MAX_ITEMS = 8;

function hide() {
    App.get_window("AppLauncher")!.hide();
}

function AppButton({ app }: { app: Apps.Application }) {
    return (
        <button
            className="AppButton"
            onClick={() => {
                hide();
                app.launch();
            }}
            onKeyPressEvent={(self, event) => {
                if (event.get_keyval()[1] == Gdk.KEY_Return) {
                    hide();
                    app.launch();
                }
            }}
        >
            <box>
                <icon icon={app.iconName} />
            </box>
        </button>
    );
}

export default function Launcher(/* gdkmonitor: Gdk.Monitor */) {
    const { TOP, BOTTOM } = Astal.WindowAnchor;

    const apps = new Apps.Apps();

    const width = Variable(2000);

    const text = Variable("");

    const list = text((text) => apps.fuzzy_query(text).slice(0, MAX_ITEMS));
    const onEnter = () => {
        apps.fuzzy_query(text.get())?.[0].launch();
        hide();
    };

    const entry = new Widget.Entry({
        placeholder_text: "Search",
        text: text(),
        onChanged: (self) => text.set(self.text),
        onActivate: onEnter,
    });

    return (
        <window
            name="AppLauncher"
            exclusivity={Astal.Exclusivity.IGNORE}
            anchor={TOP | BOTTOM}
            visible={false}
            keymode={Astal.Keymode.ON_DEMAND}
            onShow={(self) => {
                apps.reload();
                text.set("");
                entry.grab_focus();

                width.set(self.get_current_monitor().workarea.width);
            }}
            onKeyPressEvent={(self, event) => {
                if (event.get_keyval()[1] === Gdk.KEY_Escape) {
                    self.hide();
                    return;
                }
            }}
            application={App}
        >
            <box>
                <eventbox
                    widthRequest={width((w) => w / 2)}
                    expand
                    onClick={hide}
                />
                <box hexpand={false} vertical>
                    <eventbox heightRequest={100} onClick={hide} />
                    <box widthRequest={500} className="Applauncher" vertical>
                        {entry}
                        {/*
                        <entry
                            placeholderText="Search"
                            text={text()}
                            onChanged={(self) => text.set(self.text)}
                            onActivate={onEnter}
                        />
                        */}
                        <box spacing={8} halign={Gtk.Align.CENTER}>
                            {list.as((list) =>
                                list.map((app: Apps.Application) => (
                                    <AppButton app={app} />
                                ))
                            )}
                        </box>
                        <box
                            halign={Gtk.Align.CENTER}
                            className="not-found"
                            vertical
                            visible={list.as((l) => l.length === 0)}
                        >
                            <icon icon="system-search-symbolic" />
                            <label label="No match found" />
                        </box>
                    </box>
                    <eventbox expand onClick={hide} />
                </box>
                <eventbox
                    widthRequest={width((w) => w / 2)}
                    expand
                    onClick={hide}
                />
            </box>
        </window>
    );
}
