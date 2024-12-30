#
.PHONY:		build

#
VERSION!=	cat manifest.json | jq -r ".version"

#
build::
	zip -r ../stop-smooth-scrolling-${VERSION}.zip . -x ".git/*"
