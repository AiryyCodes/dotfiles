import QtQuick
import qs
import qs.services.theme

Text {
    id: root

    verticalAlignment: Text.AlignVCenter

    color: ThemeService.color("text")

    font {
        family: Config.options.fonts.main
        pixelSize: ThemeService.value("font.size.normal")
    }
}
