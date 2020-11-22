import { Flex } from "@chakra-ui/core";
import { BaseText } from "../base/base-text";
import React from "react";

export const FilterNav = (props: any) => {
  const { content } = props;
  return (
    <Flex
      justifyContent={"space-between"}
      alignItems={"center"}
      py={"10px"}
      px={"15px"}
    >
      <BaseText color={"black"} fontSize={"14px"} fontWeight={"bold"}>
        {content.filter_title}
      </BaseText>
      <BaseText color={"red.500"} fontSize={"14px"} fontWeight={"bold"}>
        {content.reset_title}
      </BaseText>
    </Flex>
  );
};
