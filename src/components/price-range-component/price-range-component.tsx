// todo use two side range
import React, { useState } from "react";
import {
  Box,
  Flex,
  Input,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Stack,
} from "@chakra-ui/core";
import { BaseText } from "../base/base-text";

export const PriceRangeComponent = (props: any) => {
  const [rangeVal, setRangeVal] = useState(20);
    const {content} = props;

  return (
    <Box>
      <Flex justifyContent={"space-between"} alignItems={"center"} my={"15px"}>
        <BaseText color={"black"}>{content.price_range} ({content.currency})</BaseText>
        <BaseText color={"black"}>-</BaseText>
      </Flex>
      <Slider
        color="red"
        defaultValue={rangeVal}
        value={rangeVal}
        onChange={(value: any) => setRangeVal(value)}
      >
        <SliderTrack dir={"right"}>
          <SliderFilledTrack color={"red"} />
        </SliderTrack>
        <SliderThumb />
      </Slider>
      <Stack isInline>
        <Input value={rangeVal} />
        <Input value={rangeVal} />
      </Stack>
    </Box>
  );
};
