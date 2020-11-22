import React, { memo, useEffect, useState } from "react";
import { Box, BoxProps, Text, Flex, Stack } from "@chakra-ui/core/dist";
import { BaseText } from "./base/base-text";
import { BsClockHistory } from "react-icons/bs";

// converted mobile countdown to web
const DEFAULT_DIGIT_STYLE = { backgroundColor: "#FAB913" };
const DEFAULT_DIGIT_TXT_STYLE = { color: "#000" };
const DEFAULT_TIME_LABEL_STYLE = { color: "#000" };
const DEFAULT_SEPARATOR_STYLE = { color: "#000" };
const DEFAULT_TIME_TO_SHOW = ["D", "H", "M", "S"];
const TYPE = "INC" || "DEC";
const DEFAULT_TIME_LABELS = {
  d: "Days",
  h: "Hours",
  m: "Minutes",
  s: "Seconds",
};

interface Props extends BoxProps {
  digitStyle: object;
  digitTxtStyle: object;
  timeLabelStyle?: object;
  timeLabels: Partial<typeof DEFAULT_TIME_LABELS>;
  separatorStyle: object;
  timeToShow: typeof DEFAULT_TIME_TO_SHOW;
  showSeparator: boolean;
  running: boolean;
  size: number;
  initialUntil: number;
  onFinish?: () => void;
  type?: typeof TYPE;
}

// @ts-ignore
export const AppCounter = memo((props: Props) => {
  const {
    digitStyle = DEFAULT_DIGIT_STYLE,
    digitTxtStyle = DEFAULT_DIGIT_TXT_STYLE,
    timeLabelStyle = DEFAULT_TIME_LABEL_STYLE,
    timeLabels = DEFAULT_TIME_LABELS,
    separatorStyle = DEFAULT_SEPARATOR_STYLE,
    timeToShow = DEFAULT_TIME_TO_SHOW,
    showSeparator = false,
    size = 13,
    running = true,
    type = "DEC",
    onChange,
    onFinish,
    style,
    initialUntil,
    onClick,
    ...restProps
  } = props;

  const [until, setUntil] = useState(Math.max(initialUntil, 0));
  useEffect(() => {
    let countDownGlobal: any = null;
    const updateTimer = () => {
      if ((!until && type === "DEC") || !running) {
        // console.log({ countDownGlobal, msg: 'timer cleared' });
        clearInterval(countDownGlobal);
        return;
      }

      const newUntil = type === "DEC" ? until - 1 : until + 1;

      if (newUntil === 0 && type === "DEC") {
        clearInterval(countDownGlobal);
        setUntil(0);
        onFinish && onFinish();
      } else {
        // console.log({ countDownGlobal, until, newUntil });
        setUntil(newUntil);
      }
    };

    if (countDownGlobal) {
      clearInterval(countDownGlobal);
      countDownGlobal = undefined;
    }
    countDownGlobal = setInterval(updateTimer, 1000);
    return () => clearInterval(countDownGlobal);
  }, [until]);

  const getTimeLeft = () => {
    return {
      seconds: until % 60,
      minutes: parseInt(String(until / 60), 10) % 60,
      hours: parseInt(String(until / (60 * 60)), 10) % 24,
      days: parseInt(String(until / (60 * 60 * 24)), 10),
    };
  };

  const renderDigit = (d: string) => {
    return (
      <Box>
        <Text>{d}</Text>
      </Box>
    );
  };

  const renderLabel = (label: string | undefined) => {
    if (label) {
      return <Text>{label}</Text>;
    }
    return "";
  };

  const renderDoubleDigits = (label: string | undefined, digits: string) => {
    return (
      <Stack isInline spacing={"2px"} style={digitTxtStyle}>
        <Box as={"span"}>{renderDigit(digits)}</Box>
        <Box as={"span"}>{renderLabel(label)}</Box>
      </Stack>
    );
  };

  const renderSeparator = () => {
    return (
      <Box>
        <Text style={separatorStyle}>{":"}</Text>
      </Box>
    );
  };

  // const timeLeftInMin = parseInt(String(until / 60), 10) % 60;
  const warningTime = 300000;

  const injuryTime = until < warningTime;

  const renderCountDown = () => {
    const { days, hours, minutes, seconds } = getTimeLeft();
    const padTimeZero = (number: number) => String(number).padStart(2, "0");
    const newTime = `${padTimeZero(days)}:${padTimeZero(hours)}:${padTimeZero(
      minutes
    )}:${padTimeZero(seconds)}`.split(":");
    return (
      <Stack isInline spacing={"5px"} alignItems={"center"}>
        <BaseText color={"#adb5bd"}>
          <BsClockHistory color={injuryTime ? "red" : undefined} />
        </BaseText>
        <Flex onClick={onClick} {...restProps}>
          {timeToShow.includes("D")
            ? renderDoubleDigits(timeLabels.d, newTime[0])
            : null}
          {showSeparator && timeToShow.includes("D") && timeToShow.includes("H")
            ? renderSeparator()
            : null}
          {timeToShow.includes("H")
            ? renderDoubleDigits(timeLabels.h, newTime[1])
            : null}
          {showSeparator && timeToShow.includes("H") && timeToShow.includes("M")
            ? renderSeparator()
            : null}
          {timeToShow.includes("M")
            ? renderDoubleDigits(timeLabels.m, newTime[2])
            : null}
          {showSeparator && timeToShow.includes("M") && timeToShow.includes("S")
            ? renderSeparator()
            : null}
          {timeToShow.includes("S")
            ? renderDoubleDigits(timeLabels.s, newTime[3])
            : null}
        </Flex>
      </Stack>
    );
  };

  return <>{renderCountDown()}</>;
});
