source settings.sh

for monitor in $(hyprctl monitors | grep 'Monitor' | awk '{ print $2 }'); do

    hyprctl hyprpaper preload "${wallpaper}"

    hyprctl hyprpaper wallpaper "$monitor,${wallpaper}"

done