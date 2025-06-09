import { App } from "astal/gtk3";
import style from "./style.scss";

import Launcher from "./Launcher/Launcher";
import Bar from "./Bar/Bar";

App.start({
    css: style,
    main() {
        Launcher();
        // App.get_monitors().map(Bar);
    },
    requestHandler(request: string, res: (response: any) => void) {
        if (request == "show launcher") {
            App.get_window("AppLauncher")?.show();
            res("Success");
        }
    },
});
