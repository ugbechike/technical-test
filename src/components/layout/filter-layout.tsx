import React, { ReactComponentElement } from "react";
import { Box } from "@chakra-ui/core";

type FilterLayoutProps = {
  children: ReactComponentElement<any>;
};

export const FilterLayout = (props: FilterLayoutProps) => {
  const { children } = props;
  return (
    <Box
      color={"black"}
      w={"20%"}
      borderWidth={1}
      display={{ base: "none", md: "block" }}
    >
      {children}
    </Box>
  );
};
