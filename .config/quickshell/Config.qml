pragma Singleton

import Quickshell
import Quickshell.Io

Singleton {
    id: root

    property string filePath: Paths.shellConfig
    property alias options: configJsonAdapter

    FileView {
        id: configFileView
        path: root.filePath
        watchChanges: true
        onFileChanged: reload()
        onAdapterUpdated: writeAdapter()
        onLoadFailed: error => {
            if (error == FileViewError.FileNotFound) {
                writeAdapter()
            }
        }

        JsonAdapter {
            id: configJsonAdapter

            property string theme: "dark"

            property JsonObject fonts: JsonObject {
                property string main: "CaskaydiaCove NFM"
            }

            property JsonObject animation: JsonObject {
                property int duration: 80
            }

            property JsonObject bar: JsonObject {
                property int height: 36
                property int margin: 4
            }
        }
    }
}
