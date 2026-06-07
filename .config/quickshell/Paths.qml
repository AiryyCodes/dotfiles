pragma Singleton

import Quickshell
import QtCore

Singleton {
    readonly property string config: StandardPaths.standardLocations(StandardPaths.ConfigLocation)[0]

    property string shellConfig: `${Paths.config}/config.json`
    property string themesDir: `${Paths.config}/themes`
}
