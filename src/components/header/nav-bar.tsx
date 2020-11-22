import React from "react";
import { Container } from "../../../utils/container";
import {
  Box,
  Button,
  Flex,
  Stack,
  Link,
  Input,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/core";
import { useRouter } from "next/router";
import { BaseText } from "../base/base-text";
import { BiSearch, BiDownArrow } from "react-icons/bi";
import { BsFillGridFill, BsList } from "react-icons/bs";

export const DesktopNavBar = (props: any) => {
  const { content } = props;
  const router = useRouter();
  const { locale } = router;

  return (
    <Flex alignItems={"center"}>
      <Box display={{ base: "none", md: "flex" }} flex={1}>
        <Link fontSize={"sm"} href={"/"}>
          {" "}
          {content.welcome_home} / {content.auction_title} (
          {content.vehicle_title})
        </Link>
      </Box>

      <Button
        variantColor="teal"
        marginRight={3}
        display={{ base: "none", md: "flex" }}
        onClick={async () => {
          await router.push("/auction-home", "/auction-home", {
            locale: locale === "en" ? "ar" : "en",
          });
          router.reload();
        }}
      >
        {content.change_language}
      </Button>
    </Flex>
  );
};

type secondLayoutNavBar = {
  content: any;
  size: number;
  currentPage: number;
};
export const SecondLayerNavBar = (props: secondLayoutNavBar) => {
  const { content, currentPage, size } = props;
  return (
    <Container>
      <Flex alignItems={"center"} py={"10px"}>
        <Box flex={1}>
          <BaseText fontWeight={"bold"} color={"black"}>
            {content.vehicle_title} ({content.auction_title})
          </BaseText>
          <BaseText fontSize={"sm"} color={"grey"}>
            {content.display_title} {currentPage} of {size}
          </BaseText>
        </Box>

        <Stack
          isInline
          spacing={8}
          display={{ base: "none", md: "flex" }}
          alignItems={"flex-end"}
        >
          <Flex minW={350} color={"black"}>
            <Input borderRadius="0" placeholder={content.search_item} />
            <IconButton
              borderWidth={1}
              borderRadius={0}
              borderTopRightRadius={5}
              borderBottomRightRadius={5}
              aria-label="Search database"
              icon={BiSearch}
            />
          </Flex>
          <Box>
            <Menu>
              {/*@ts-ignore*/}
              <MenuButton as={Button} leftIcon={BiDownArrow}>
                {content.sort_list}
              </MenuButton>
              <MenuList>
                <MenuItem>By End Date</MenuItem>
                <MenuItem>By price</MenuItem>
                <MenuItem>By year of the item</MenuItem>
              </MenuList>
            </Menu>
          </Box>
          <Flex
            minW={100}
            justifyContent={"center"}
            alignItems={"center"}
            borderColor={"#EDF2F6"}
            borderWidth={1}
            borderRadius={5}
          >
            <Box width={"50%"} px={"15px"} py={"10px"}>
              <BsFillGridFill color={"red"} />
            </Box>
            <Box
              width={"50%"}
              px={"15px"}
              py={"10px"}
              borderWidth={1}
              bg={"#EDF2F6"}
              borderColor={"#EDF2F6"}
            >
              <BsList />
            </Box>
          </Flex>
        </Stack>
      </Flex>
    </Container>
  );
};

export const NavBar = (props: any) => {
  const { content } = props;

  return (
    <Box borderBottomWidth={1} paddingY={3}>
      <Container>
        <DesktopNavBar content={content} />
      </Container>
    </Box>
  );
};
