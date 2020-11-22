import React, {useContext, useEffect, useState} from "react";
import { useRouter } from "next/router";
import { Box, Flex, Image, Stack } from "@chakra-ui/core";
import { AiOutlineHeart } from "react-icons/ai";
import { ImHammer2 } from "react-icons/im";
import { FiHash } from "react-icons/fi";
import { BaseText } from "./base-text";
import { AppCounter } from "../app-count-down-component";
import isEqual from "lodash.isequal";
import {ThemeContext} from "../../../pages/auction-home";

type BaseCardComponent = {
  auctionItem?: any;
  updateAuctionItem?: any;
};

const formatImageUrl = (url: string) => {
  return url.replace("[w]", "400").replace("[h]", "200");
};

export const BaseCardComponent = (props: BaseCardComponent) => {
  const { auctionItem = {}, updateAuctionItem } = props;

  const isSameData = isEqual(auctionItem, updateAuctionItem);
  const carData = !isSameData ? updateAuctionItem : auctionItem;

  const [flashData, setFlashData] = useState(false);

  useEffect(() => {
    if (!isSameData) {
      setFlashData(true);
    }

    const timeout = setTimeout(() => {
      setFlashData(false);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [carData]);

  const { image = "", AuctionInfo = {}, titleEn, titleAr } = carData || {};

  const {
    bids,
    currencyEn,
    currencyAr,
    currentPrice,
    itemid,
    endDate,
  } = AuctionInfo;

  let timeLeft = endDate;
  //@ts-ignore
  const [timerFinished, setTimerFinish] = React.useState(false);
  const router = useRouter();

  const { locale } = router;
  const title = locale === "en" ? titleEn : titleAr;
  const currency = locale === "en" ? currencyEn : currencyAr;
  const content = useContext(ThemeContext);


  return (
    <Box
      borderWidth={1}
      borderColor={"#adb5bd"}
      minH={250}
      boxShadow={"md"}
      rounded={10}
      position={"relative"}
    >
      <Box position={"absolute"} right={3} top={3} cursor={'pointer'}>
        <AiOutlineHeart size={25} color={"white"} />
      </Box>
      <Box>
        {flashData ? (
          <Box bg={"grey"} h={"190px"} />
        ) : (
          <Image
            borderTopRightRadius={8}
            borderTopLeftRadius={8}
            h={"190px"}
            width={"100%"}
            objectFit={"cover"}
            src={formatImageUrl(image)}
          />
        )}
        <Box
          // bg={"rgb(2,0,36)"}
          className={'hammer_icon_wrapper'}
          py={"10px"}
          px={"10px"}
          position={"absolute"}
          right={6}
          bottom={140}
          borderWidth={1}
          borderRadius={20}
          w={"35px"}
          height={"35px"}
          justifyContent={"center"}
        >
          <ImHammer2 size={"15px"} color={"white"} />
        </Box>
      </Box>
      <Box px={"10px"} py={"10px"}>
        <BaseText color={"black"} fontWeight={'bold'}>{title}</BaseText>
        <BaseText fontWeight={'semi-bold'} fontSize={"12px"} pt={"10px"} color={"grey"}>
          {content.current_bid}:
        </BaseText>
        <Stack isInline spacing={"5px"} pb={"10px"}>
          <BaseText color={"#05870A"} fontSize={"14px"}>
            {currency}
          </BaseText>
          <BaseText fontWeight={"bold"} color={"#05870A"} fontSize={"20px"}>
            {currentPrice}
          </BaseText>
        </Stack>
      </Box>
      <Flex
        borderTopWidth={1}
        justifyContent={"space-between"}
        px={"10px"}
        py={"10px"}
      >
        <Stack isInline alignItems={"center"}>
          <Box borderWidth={1} p={"3px"} borderRadius={5} bg={"#adb5bd"}>
            <FiHash color={"white"} />
          </Box>
          <BaseText color={"black"}>{itemid}</BaseText>
        </Stack>
        <Stack isInline spacing={"5px"} alignItems={"center"}>
          <BaseText color={"#adb5bd"}>
            <ImHammer2 />
          </BaseText>
          <BaseText color={"black"}>{bids}</BaseText>
        </Stack>
        <Box>
          <AppCounter
            initialUntil={timeLeft}
            size={12}
            onFinish={() => setTimerFinish(true)}
            separatorStyle={{ color: "black", marginLeft: 1, marginRight: 1 }}
            digitStyle={{ backgroundColor: "#FFF" }}
            digitTxtStyle={{ color: "black" }}
            timeToShow={["H", "M", "S"]}
            showSeparator
            timeLabels={{ h: "h", m: "m", s: "s" }}
            running={true} // todo on timer please
          />
        </Box>
      </Flex>
    </Box>
  );
};

