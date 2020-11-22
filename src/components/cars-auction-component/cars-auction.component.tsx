import { Box, SimpleGrid } from "@chakra-ui/core";
import { BaseCardComponent } from "../base/base-card-component";
import React from "react";

type CarsAuctionComponent = {
  auctionListItems: any;
  size: number;
  updateAuctionItem: any[]
};
export const CarsAuctionComponent = (props: CarsAuctionComponent) => {
  const { auctionListItems = [], updateAuctionItem=[] } = props;

  return (
    <Box>
      <SimpleGrid columns={{base: 1, md: 3}} spacing={6} py={"20px"}>
        {auctionListItems.map((auctionItem: any, index: number) => {
          return <BaseCardComponent key={index} auctionItem={auctionItem} updateAuctionItem={updateAuctionItem[index]} />;
        })}
      </SimpleGrid>
    </Box>
  );
};
