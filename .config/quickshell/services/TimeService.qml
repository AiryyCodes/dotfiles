pragma Singleton

import Quickshell

Singleton {
    property var clock: SystemClock {
        id: clock
        precision: {
            return SystemClock.Seconds
        }
    }

    property string time: Qt.locale().toString(clock.date, "hh:mm")
    property string date: Qt.locale().toString(clock.date, "ddd, dd/MM")
}
