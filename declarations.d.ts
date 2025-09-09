config.transformer.babelTransformerPath = require.resolve("react-native-svg-transformer");
config.resolver.assetExts = config.resolver.assetExts.filter((ext) => ext !== "svg");
config.resolver.sourceExts.push("svg");

declare module "*.svg" {
   import React from "react";
   import { SvgProps } from "react-native-svg";
   const content: React.FC<SvgProps>;
   export default content;
}
