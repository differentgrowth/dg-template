import type { DefaultCellComponentProps, NumberFieldClient } from "payload";

import { currency } from "@/lib/utils";

export const CurrencyCell = ({
  cellData,
}: DefaultCellComponentProps<NumberFieldClient>) => {
  if (typeof cellData === "undefined" || Number.isNaN(cellData)) {
    return <span>N/A</span>;
  }

  return <span>{currency(cellData)}</span>;
};
