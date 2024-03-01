# Airyy's Dotfiles

### Configured Apps
* Hyprland (Window Manager)
* Hyprpaper (Wallpaper)
* Alacritty (Terminal)
* Rofi (Application Launcher)

### Optional
* Cava (Audio Visualizer)
* Neovim (Code/Text Editor)
* Neofetch (System Info Visualizer)
* Starship (Terminal Prompt)

### Install Requirements
* Git

### Installing
To install you need to run these commands:
```
cd ~/Downloads
git clone https://github.com/AiryyCodes/dotfiles.git
cp -r dotfiles/.config/ ~/.config
```

One line version:
```
cd ~/Downloads && git clone https://github.com/AiryyCodes/dotfiles.git && cp -r dotfiles/.config/ ~/.config
```

### Info
If you have trouble with multiple monitors, go into `~/.config/hypr/hyprland.conf` and change the monitor settings accordingly to your setup.
To see what your monitors are named run `hyprctl monitors` in the terminal.
