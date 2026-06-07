pragma Singleton

import Quickshell
import Quickshell.Io
import QtQuick
import qs

Singleton {
    id: root

    property string currentTheme: "dark"
    property var theme: ({})

    readonly property string themePath: `${Paths.themesDir}/${currentTheme}.json`

    function color(name)  { return theme?.colors?.[name]  ?? "#ff00ff" }
    function value(key, fallback = null)  { return key.split(".").reduce((obj, part) => obj?.[part], theme) ?? fallback }

    FileView {
        id: themeFile
        path:         root.themePath
        watchChanges: true
        blockLoading: true
        onFileChanged: {
            reload()
            root._parse()
        }
        onPathChanged: {
            reload()
            root._parse()
        }
    }

    function _parse() {
        const raw = themeFile.text()
        if (!raw) return
        try {
            root.theme = JSON.parse(raw)
        } catch (e) {
            console.warn("Theme parse failed:", e)
        }
    }

    Component.onCompleted: _parse()
}
