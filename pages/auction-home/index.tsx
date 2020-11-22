import { AuctionLayout } from "../../src/components/layout/layout";
import { Box, Divider, Flex, Spinner } from "@chakra-ui/core";
import React, { Context } from "react";
import { Container } from "../../utils/container";
import { GetStaticProps } from "next";
import fs from "fs";
import path from "path";
import { useGetAuctionCars } from "../../src/components/hooks/use-get-cars-api";
import { useRouter } from "next/router";
import { useInterval } from "../../src/components/hooks/use-interval";
import { useGetUpdatedAuctionData } from "../../src/components/hooks/use-get-updated-api-data";
import { PaginationComponent } from "../../src/components/pagination/pagination-component";
import { CarsAuctionComponent } from "../../src/components/cars-auction-component/cars-auction.component";
import { PriceRangeComponent } from "../../src/components/price-range-component/price-range-component";
import { FilterNav } from "../../src/components/filter-components/filter-nav";
import { FilterContents } from "../../src/components/filter-components/filter-contents";
import { listItems1, listItems2 } from "../../utils/helper/dummy-data";
import { FilterLayout } from "../../src/components/layout/filter-layout";
import { BaseText } from "../../src/components/base/base-text";
import { trans } from "../../utils/trans";

export const ThemeContext: Context<any> = React.createContext({});

export default function Home(props: any) {
  const { content } = props;
  const { data: itemData, pagination, isLoading } = useGetAuctionCars();

  const {
    data: updatedData,
    updatedPaginatedData,
    setOpt,
  } = useGetUpdatedAuctionData({});
  const { size, data } = pagination || {};
  const { paginatedUpdatedData } = updatedPaginatedData;
  const { query } = useRouter();
  const updatedCarData: any = updatedData?.Cars?.length !== undefined ? updatedData : itemData;
  const lastTicks = updatedData?.Cars?.length !== undefined ? updatedData?.Ticks : itemData?.Ticks;

  const currentPage = Number(query.page) || 0;

  const autoRefreshDelay = (updatedCarData.RefreshInterval) * 1000 || 60000;

  const onRefresh = async () => {
    await setOpt({ ticks: lastTicks });
  };

  useInterval(onRefresh, autoRefreshDelay);

  if (isLoading) {
    return (
      <Box className={"loading"}>
        <Spinner
          thickness="10px"
          speed="0.65s"
          emptyColor="gray.200"
          color="red.500"
          /*@ts-ignore*/
          size="100px"
        />
      </Box>
    );
  }

  return (
    <Box>
      <Flex>
        <FilterLayout>
          <>
            <FilterNav content={content} />
            <Divider />
            <Container>
              <FilterContents
                listItems={listItems1}
                title={content.type_title}
              />
              <Divider />
              <FilterContents
                listItems={listItems2}
                title={content.make_title}
              />
              <Divider />
              <PriceRangeComponent content={content} />
              <Divider />
            </Container>
          </>
        </FilterLayout>

        <AuctionLayout
          title={"emirates-auction"}
          content={content}
          size={size}
          currentPage={currentPage}
        >
          <Container>
            <BaseText color={"black"}>{trans("auction_title")}</BaseText>
            <ThemeContext.Provider value={content}>
              <CarsAuctionComponent
                size={size}
                auctionListItems={data[currentPage]}
                updateAuctionItem={paginatedUpdatedData[currentPage]}
              />
            </ThemeContext.Provider>
            <PaginationComponent pagination={{ ...pagination, currentPage }} />
          </Container>
        </AuctionLayout>
      </Flex>
    </Box>
  );
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { locale } = ctx;

  const dir = path.join(process.cwd(), "public", "static");

  const filePath = `${dir}/${locale}.json`;

  const buffer = fs.readFileSync(filePath);

  const content = JSON.parse(buffer.toString());

  return {
    props: {
      content,
    },
  };
};
