import Quickshell
import QtQuick
import QtQuick.Layouts
import QtCore
import qs
import qs.widgets
import qs.services.theme

Scope {
    id: root

    Variants {
        model: Quickshell.screens

        PanelWindow {
            required property var modelData
            screen: modelData

            anchors {
                top: true
                left: true
                right: true
            }

            implicitHeight: Config.options.bar.height
            exclusiveZone: Config.options.bar.height

            color: "transparent"

            Rectangle {
                id: bgRect

                anchors {
                    top:    parent.top
                    left:   parent.left
                    right:  parent.right
                    bottom: parent.bottom
                    topMargin:    Config.options.bar.margin
                    leftMargin:   Config.options.bar.margin
                    rightMargin:  Config.options.bar.margin
                }

                border {
                    width: 1
                    color: ThemeService.color("border")
                }

                color: ThemeService.color("background")
                radius: ThemeService.value("radius")

                RowLayout {
                    anchors.fill: parent
                    anchors.margins: 4

                    // Left content
                    RowLayout {
                        Layout.alignment: Qt.AlignLeft

                        Button {
                            variant: ButtonStyle.ghost
                            StyledText {
                                text: "App"
                            }
                        }
                    }

                    Item {
                        Layout.fillWidth: true
                    }

                    // Center content
                    RowLayout {
                        Layout.alignment: Qt.AlignHCenter

                        Button {
                            Clock {}
                        }

                    }

                    Item {
                        Layout.fillWidth: true
                    }

                    // Right content
                    RowLayout {
                        Layout.alignment: Qt.AlignRight

                        Button {
                            variant: ButtonStyle.ghost
                            StyledText {
                                text: "Actions"
                            }
                        }
                    }
                }
            }
        }
    }
}
