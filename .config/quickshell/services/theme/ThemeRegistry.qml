pragma Singleton

import Quickshell
import Quickshell.Io
import QtQuick
import qs

Singleton {
    id: root
    property var themes: []

    // Run on startup and whenever you want to rescan
    function scan() { lsProc.running = true }

    Process {
        id: lsProc
        command: ["bash", "-c", `ls "${Paths.themesDir}"/*.json 2>/dev/null`]
        stdout: StdioCollector {
            onStreamFinished: {
                root.themes = text.trim().split("\n")
                .filter(line => line.length > 0)
                .map(path => {
                        const file = path.split("/").pop()
                        const id   = file.replace(".json", "")
                        const name = id.charAt(0).toUpperCase()
                        + id.slice(1).replace(/-/g, " ") // Dark
                        return { id, name, path }
                })
            }
        }
    }

    Component.onCompleted: scan()
}
