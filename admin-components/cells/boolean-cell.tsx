import type { CheckboxFieldClient, DefaultCellComponentProps } from 'payload';

import { CheckIcon, XIcon } from '@phosphor-icons/react/dist/ssr';

export const BooleanCell = ({
  cellData,
}: DefaultCellComponentProps<CheckboxFieldClient>) => {
  return (
    <span>
      {cellData ? (
        <CheckIcon className="custom-svg custom-svg--success" />
      ) : (
        <XIcon className="custom-svg custom-svg--destructive" />
      )}
    </span>
  );
};
