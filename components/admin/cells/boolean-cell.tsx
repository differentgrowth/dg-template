import type { CheckboxFieldClient, DefaultCellComponentProps } from "payload";

import { CheckIcon, XIcon } from "@phosphor-icons/react/dist/ssr";

export const BooleanCell = ({
  cellData,
}: DefaultCellComponentProps<CheckboxFieldClient>) => (
  <span>
    {cellData ? (
      <CheckIcon
        className="size-6 text-(--theme-success-550)"
        weight="duotone"
      />
    ) : (
      <XIcon className="size-6 text-(--theme-error-550)" weight="duotone" />
    )}
  </span>
);
