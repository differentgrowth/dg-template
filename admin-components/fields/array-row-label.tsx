'use client';

import { useRowLabel } from '@payloadcms/ui';

export const ArrayRowLabel = ({
  targetField = 'label',
}: {
  targetField?: string;
} = {}) => {
  const { data, rowNumber } = useRowLabel<{
    [key: string]: string | undefined;
  }>();

  const customLabel = `${String((rowNumber || 0) + 1).padStart(2, '0')}: ${data[targetField] || ''}`;

  return <div>{customLabel}</div>;
};
