{
  description = "My App Launcher";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixos-unstable";

    astal = {
      url = "github:aylur/astal";
      inputs.nixpkgs.follows = "nixpkgs";
    };
    ags = {
      url = "github:aylur/ags";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs = {
    self,
    nixpkgs,
    ags,
    astal,
  }: let
    system = "x86_64-linux";
    pkgs = nixpkgs.legacyPackages.${system};
  in {
    packages.${system} = {
      default = pkgs.stdenvNoCC.mkDerivation rec {
        src = ./.;
        name = "applauncher";

      nativeBuildInputs = [
        ags.packages.${system}.default
        astal.packages.${system}.apps
        pkgs.wrapGAppsHook
        pkgs.gobject-introspection
      ];

      buildInputs = with astal.packages.${system}; [
        astal3
        io
        apps
        # any other package
      ];

      installPhase = ''
        mkdir -p $out/bin
        ags bundle app.ts $out/bin/${name}
        chmod +x $out/bin/${name}
      '';
      };
    };

    devShells.${system} = {
      default = pkgs.mkShell {
        buildInputs = [
          astal.packages.${system}.apps
          # includes astal3 astal4 astal-io by default
          (ags.packages.${system}.default.override {
            extraPackages = [
              # cherry pick packages
            ];
          })
        ];
        shellHook = ''
          export GI_TYPELIB_PATH="${astal.packages.${system}.apps}/lib/girepository-1.0:$GI_TYPELIB_PATH"
        '';
      };
    };
  };
}
