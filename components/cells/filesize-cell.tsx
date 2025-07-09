import type { DefaultCellComponentProps, NumberFieldClient } from 'payload';

export const FilesizeCell = ({
  cellData,
}: DefaultCellComponentProps<NumberFieldClient>) => {
  return <span>{(cellData / 1_000_000).toFixed(2)} Mb</span>;
};
