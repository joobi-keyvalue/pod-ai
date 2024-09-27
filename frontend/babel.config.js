module.exports = {
  presets: [["@babel/env"], ["@babel/react"], ["@babel/preset-flow"]],
  plugins: [
    ["@babel/plugin-proposal-class-properties"],
    ["@babel/plugin-transform-typescript"],
  ],
};