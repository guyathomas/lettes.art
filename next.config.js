const withTM = require("next-transpile-modules")(["@material-ui/icons"]);
const contentfulCDN = "images.ctfassets.net";
const cloudinaryCDN = "res.cloudinary.com"

module.exports = withTM({
  images: {
    domains: [contentfulCDN,  cloudinaryCDN],
  },
});
