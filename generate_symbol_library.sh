#!/usr/bin/env bash

set -e
set -x

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
pushd $SCRIPT_DIR

tmpdir=$(mktemp -d)

function common_finalize {
    # If any specific test launcher needs to do its own cleanup as well,
    # it should set the EXIT trap and make sure to also call this function
    # internally.
    exitcode=$?

    rm -rf $tmpdir

    return $exitcode
}

trap common_finalize EXIT

rm -Rf $SCRIPT_DIR/output
mkdir -p $tmpdir \
         $SCRIPT_DIR/output


npm install

# Copy the sources to a temporary directory to modify them
cp -a $SCRIPT_DIR/* $tmpdir/

cp gulpfile.js package.json $tmpdir
pushd $tmpdir
find . -maxdepth 1 -mindepth 1 -type d -name '[[:digit:]]*' \
    -printf "Processing %f\n" \
    -exec node_modules/svgo/bin/svgo --multipass {}  \; \
    -exec node_modules/gulp/bin/gulp.js --iconset {} --dest . \; \
    -exec cp {}/sprite/svg-symbols.svg $SCRIPT_DIR/output/{}.svg \;
popd # $tmpdir

popd # $SCRIPT_DIR