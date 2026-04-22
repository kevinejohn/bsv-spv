import type { ChainTicker } from "bsv-headers";

export type SupportedTicker = ChainTicker;

const SUPPORTED_TICKERS: Set<SupportedTicker> = new Set(["BTC", "BCH", "BSV"]);

export function assertSupportedTicker(
  ticker: string
): asserts ticker is SupportedTicker {
  if (!SUPPORTED_TICKERS.has(ticker as SupportedTicker)) {
    throw Error(
      `Unsupported ticker "${ticker}". Supported tickers: BTC, BCH, BSV`
    );
  }
}
