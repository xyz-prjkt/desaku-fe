import { StatisticProps } from "antd";
import CountUp from "react-countup";

const formatter: StatisticProps["formatter"] = (value) => (
  <CountUp end={value as number} separator="," />
);

export { formatter };
