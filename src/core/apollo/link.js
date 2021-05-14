import { HttpLink, from, split } from "@apollo/client";

import { RetryLink } from "@apollo/client/link/retry";

export const uniswap = from([
  new RetryLink(),
  new HttpLink({
    uri: "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2",
    shouldBatch: true,
  }),
]);

export const bar = from([
  new RetryLink(),
  new HttpLink({
    uri: "http://openswap.analytics.pops.one:8000/subgraphs/name/sushiswap/bar",
    shouldBatch: true,
  }),
]);

export const masterchef = from([
  new RetryLink(),
  new HttpLink({
    uri: "http://openswap.analytics.pops.one:8000/subgraphs/name/sushiswap/masterchef",
    shouldBatch: true,
  }),
]);

export const exchange = from([
  new RetryLink(),
  new HttpLink({
    uri: "http://openswap.analytics.pops.one:8000/subgraphs/name/sushiswap/exchange",
    shouldBatch: true,
  }),
]);

export const blocklytics = from([
  new RetryLink(),
  new HttpLink({
    uri: "http://openswap.analytics.pops.one:8000/subgraphs/name/blocklytics/block-test",
    shouldBatch: true,
  }),
]);

export const lockup = from([
  new RetryLink(),
  new HttpLink({
    uri: "https://api.thegraph.com/subgraphs/name/matthewlilley/lockup",
    shouldBatch: true,
  }),
]);

export default split(
  (operation) => {
    return operation.getContext().clientName === "blocklytics";
  },
  blocklytics,
  split(
    (operation) => {
      return operation.getContext().clientName === "masterchef";
    },
    masterchef,
    split(
      (operation) => {
        return operation.getContext().clientName === "bar";
      },
      bar,
      split(
        (operation) => {
          return operation.getContext().clientName === "lockup";
        },
        lockup,
        exchange
      )
    )
  )
);
