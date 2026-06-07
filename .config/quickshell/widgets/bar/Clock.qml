import QtQuick
import QtQuick.Layouts
import qs.widgets
import qs.services
import qs.services.theme

Item {
    id: root

    implicitWidth: rowLayout.implicitWidth
    implicitHeight: rowLayout.implicitHeight

    RowLayout {
        id: rowLayout
        anchors.centerIn: parent
        spacing: 4

        StyledText {
            color: ThemeService.color("text")
            text: TimeService.time
        }

        StyledText {
            color: ThemeService.color("text")
            text: "•"
        }

        StyledText {
            color: ThemeService.color("text")
            text: TimeService.date
        }
    }
}
