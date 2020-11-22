import React from "react";
import { BoxProps, Text } from "@chakra-ui/core";

// const bgColor = { light: "white", dark: "rgb(26, 32, 44)" };
// const color = { light: "black", dark: "white" };

export const BaseText = React.forwardRef( (props: BoxProps, ref) => {
  // const { colorMode } = useColorMode();
  return <Text ref={ref} color={'white'}  {...props} />;
});
