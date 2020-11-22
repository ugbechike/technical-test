import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Radio,
  Stack,
} from "@chakra-ui/core";
import { BaseText } from "../base/base-text";
import { BiSearch } from "react-icons/bi";
import React from "react";
import {useRouter} from "next/router";

type FilterContents = {
  title: string;
  listItems: any[];
};
export const FilterContents = (props: FilterContents) => {
  const { title, listItems } = props;
  const router = useRouter();
  const { locale } = router;
  const text = locale === 'ar' ? 'عرض جميع أنواع الألف إلى الياء' : 'Show all types A - Z';

  return (
    <Box>
      <Flex justifyContent={"space-between"} alignItems={"center"} my={"15px"}>
        <BaseText color={"black"}>{title}</BaseText>
        <BaseText color={"black"}>-</BaseText>
      </Flex>

      <Box>
        <InputGroup mb={"10px"}>
          <Input placeholder={locale === 'ar' ? 'بحث' : "search"} />
          <InputRightElement children={<BiSearch color="green.500" />} />
        </InputGroup>

        <Stack spacing={3}>
          {listItems.map((listItem, index) => {
            const { nameEn, nameAr } = listItem;
            const name = locale === 'ar' ? nameAr : nameEn;
            return (
              <Radio
                key={index}
                size="lg"
                name="1"
                variantColor="orange"
                defaultChecked
              >
                <BaseText
                  color={"black"}
                  fontSize={"14px"}
                  fontWeight={"semi-bold"}
                >
                  {name}
                </BaseText>
              </Radio>
            );
          })}
        </Stack>

        <BaseText my={"15px"} color={"black"} fontSize={"14px"}>
          {text}
        </BaseText>
      </Box>
    </Box>
  );
};
