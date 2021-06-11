const withTM = require("next-transpile-modules")(["@material-ui/icons"]);
const facebookCDN = "scontent-sjc3-1.xx.fbcdn.net";
const contentfulCDN = "images.ctfassets.net";

module.exports = withTM({
  images: {
    domains: [contentfulCDN, facebookCDN],
  },
});
