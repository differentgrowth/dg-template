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
  readOnly?: boolean;
} & TextFieldClientProps;

export const SlugGenerator = ({
  targetField = 'title',
  readOnly = true,
}: Props) => {
  const { value, setValue } = useField<string>({ path: 'slug' });
  const [isLocked, setIsLocked] = useState(readOnly);

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
        display: 'flex',
        flexFlow: 'column',
        rowGap: 8,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '4px 8px',
        }}
      >
        <FieldLabel htmlFor="slug" label="Slug" />
        <Button
          buttonStyle="secondary"
          className="lock-button"
          onClick={() => setIsLocked(!isLocked)}
        >
          {isLocked ? 'Desbloquear' : 'Bloquear'}
        </Button>
        <Button disabled={isLocked} onClick={handleClick} type="button">
          Autogenerar
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
