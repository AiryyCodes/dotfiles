pragma Singleton

import Quickshell
import Quickshell.Io
import QtQuick
import qs.services.theme

Singleton {
    function load(path) {
        const file = fileView.createObject(null, {
                path: Qt.resolvedUrl(path),
                blockLoading: true
        })

        if (!file || !file.text() || file.text().length === 0) {
            console.log("Failed to load theme:", path)
            file?.destroy()
            return {}
        }

        let data = {}

        try {
            data = JSON.parse(file.text())
        } catch (e) {
            console.log("Invalid JSON:", path, e)
        }

        file.destroy()
        return data
    }

    Component {
        id: fileView

        FileView {}
    }
}
