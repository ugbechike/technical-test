import React, { ReactComponentElement } from "react";
import { Box } from "@chakra-ui/core";
import { MetaData } from "../../../constants/meta-data";
import { NavBar, SecondLayerNavBar } from "../header/nav-bar";

type AuctionLayoutProps = {
  children: ReactComponentElement<any>;
  title: string;
  content: any;
  size: number;
  currentPage: number;
};

export const AuctionLayout = (props: AuctionLayoutProps) => {
  const { children, title, content, currentPage, size } = props;
  return (
    <Box color={"black"} w={"80%"} borderWidth={1}>
      <MetaData title={title} />
      <NavBar content={content} />
      <SecondLayerNavBar
        content={content}
        size={size}
        currentPage={currentPage}
      />
      <Box borderWidth={1}>{children}</Box>
    </Box>
  );
};
