# Red Hat Icons

An open source icon set created by Red Hat, Inc. and licensed under a CC-BY-3.0 Unported license.

## Terms of usage

This icon is licensed under a Creative Commons Attribution 3.0 Unported license. If you redistribute this, Red Hat, Inc. should be given attribution. For individual uses, such as a diagram or presentation, attribution is optional.

## To build the icons into symbol libraries, do the following:

* Clone this git repository
* Install [Node.js 10.x](https://nodejs.org/dist/latest-v10.x/) (Node.js 11.x and newer are not yet supported)
* Run ./generate_symbol_library.sh

Once it finishes running, the `output/` directory will contain symbol library SVGs that can be copied to your Inkscape symbol configuration (commonly `~/.var/app/org.inkscape.Inkscape/config/inkscape/symbols/`). Restart Inkscape and your new icons will appear.