import { UseGetCarsApiReturnType } from "../hooks/use-get-cars-api";
import { useRouter } from "next/router";
import { paginateFn } from "./pagination-function";
import { Box, Stack } from "@chakra-ui/core";
import Link from "next/link";
import { BaseText } from "../base/base-text";
import React from "react";

type PaginationComponentPropsType = {
  pagination: UseGetCarsApiReturnType["pagination"] & {
    currentPage: number;
  };
};

export const PaginationComponent = (props: PaginationComponentPropsType) => {
  const { pagination } = props;

  const router = useRouter();
  const { query } = router;

  const page = Number(query.page ?? 0);

  const hasNextPage = pagination.size > page;
  const nextPage = page + 1;

  const hasPrevPage = page > 1;
  const prevPage = page - 1;

  const pageNumbers = paginateFn({ current: page, pageSize: pagination.size });

  return (
    <Stack isInline mb={10} mt={5}>
      {hasPrevPage ? (
        <Box borderWidth={1} px={"15px"} borderRadius={3}>
          <Link
            passHref
            href={{
              pathname: router.pathname,
              query: { page: prevPage },
            }}
          >
            <BaseText as={"a"} color={"black"}>
              Prev
            </BaseText>
          </Link>
        </Box>
      ) : (
        <Box
          bg={"#DEDCE0"}
          cursor={"not-allowed"}
          borderWidth={1}
          px={"15px"}
          borderRadius={3}
        >
          <BaseText as={"a"} color={"black"}>
            Prev
          </BaseText>
        </Box>
      )}
      {pageNumbers.map((number: number, index: number) => {
        const isActive = page === number;
        return (
          <Box
            px={"10px"}
            key={index}
            borderRadius={3}
            color={isActive ? "white" : "black"}
            bg={isActive ? "green.500" : "#DEDCE0"}
            borderWidth={1}
          >
            <Link
              passHref
              href={{
                pathname: router.pathname,
                query: { page: number },
              }}
            >
              <BaseText as={"a"} color={"black"}>
                {number}
              </BaseText>
            </Link>
          </Box>
        );
      })}
      {hasNextPage ? (
        <Box borderWidth={1} px={"15px"} borderRadius={3}>
          <Link
            passHref
            href={{
              pathname: router.pathname,
              query: { page: nextPage },
            }}
          >
            <BaseText as={"a"} color={"black"}>
              Next
            </BaseText>
          </Link>
        </Box>
      ) : (
        <Box
          bg={"#DEDCE0"}
          cursor={"not-allowed"}
          borderWidth={1}
          px={"15px"}
          borderRadius={3}
        >
          <BaseText as={"a"} color={"black"}>
            Next
          </BaseText>
        </Box>
      )}
    </Stack>
  );
};
