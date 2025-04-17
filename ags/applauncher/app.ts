import { App } from "astal/gtk3"
import style from "./style.scss"
import AppLauncher from "./AppLauncher"

App.start({
    css: style,
    main() {
        AppLauncher()
    },
	requestHandler(request: string, res: (response: any) => void) {
		if (request == "show launcher") {
			App.get_window("AppLauncher")?.show();
			res("Success");
		}
	}
})
