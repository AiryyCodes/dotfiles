import QtQuick
import QtQuick.Layouts
import qs
import qs.services.theme

Rectangle {
    id: root

    property string variant: ButtonStyle.normal

    signal clicked()

    default property alias content: contentItem.children

    readonly property QtObject _style: {
        switch (variant) {
            case ButtonStyle.ghost:   return _ghostStyle
            case ButtonStyle.danger:  return _dangerStyle
            default:                  return _defaultStyle
        }
    }

    Layout.fillHeight: true
    Layout.preferredHeight: implicitHeight
    Layout.alignment: Qt.AlignVCenter

    implicitWidth: contentItem.implicitWidth + 24
    implicitHeight: contentItem.implicitHeight + 10

    color: _style.bg

    radius: ThemeService.value("radius")

    // Hover overlay
    Rectangle {
        anchors.fill: parent
        radius: parent.radius
        color: area.pressed ? _style.press : _style.hover
        opacity: area.pressed ? 1.0 : area.containsMouse ? 1.0 : 0.0
        z: 1

        Behavior on opacity {
            NumberAnimation { duration: Config.options.animation.duration }
        }

        Behavior on color {
            ColorAnimation { duration: Config.options.animation.duration }
        }
    }

    Item {
        id: contentItem
        anchors.centerIn: parent
        implicitWidth: childrenRect.width
        implicitHeight: childrenRect.height
        z: 2
    }

    MouseArea {
        id: area
        anchors.fill: parent
        hoverEnabled: true
        z: 3
        onClicked: root.clicked()
    }

    QtObject {
        id: _defaultStyle
        readonly property color bg:    ThemeService.color("surface")
        readonly property color hover: ThemeService.color("surfaceHover")
        readonly property color press: ThemeService.color("surfacePress")
        readonly property color text:  ThemeService.color("text")
    }

    QtObject {
        id: _ghostStyle
        readonly property color bg:    "transparent"
        readonly property color hover: ThemeService.color("ghostHover")
        readonly property color press: ThemeService.color("ghostPress")
        readonly property color text:  ThemeService.color("subtext")
    }
}
