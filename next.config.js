const withTM = require("next-transpile-modules")(["@material-ui/icons"]);

module.exports = withTM({
  images: {
    domains: ["images.ctfassets.net"],
  },
});
