'use client';

import type { TextFieldClientProps } from 'payload';

import { useState } from 'react';

import {
  Button,
  FieldLabel,
  TextInput,
  useField,
  useFormFields,
} from '@payloadcms/ui';

import { slugify } from '@/lib/utils';

type Props = {
  targetField?: string;
} & TextFieldClientProps;

export const SlugGenerator = ({
  targetField = 'title',
  readOnly: readOnlyFromProps = true,
}: Props) => {
  const { value, setValue } = useField<string>({ path: 'slug' });
  const [isLocked, setIsLocked] = useState(readOnlyFromProps);

  const targetFieldValue = useFormFields(([fields]) => {
    return fields[targetField]?.value as string;
  });

  const handleClick = () => {
    const formattedSlug = slugify(targetFieldValue);

    if (value !== formattedSlug) {
      setValue(formattedSlug);
    }
  };

  return (
    <div
      style={{
        marginBottom: '20px',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <FieldLabel htmlFor="slug" label="Slug" />
        <Button
          buttonStyle="none"
          className="lock-button"
          onClick={(prev) => setIsLocked(!prev)}
        >
          {isLocked ? 'Unlock' : 'Lock'}
        </Button>
        <Button disabled={isLocked} onClick={handleClick} type="button">
          Generate
        </Button>
      </div>

      <TextInput
        onChange={setValue}
        path="slug"
        placeholder="Generate a slug"
        readOnly={isLocked}
        value={value}
      />
    </div>
  );
};
