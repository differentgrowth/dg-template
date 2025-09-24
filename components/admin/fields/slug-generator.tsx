"use client";

import type { TextFieldClientProps } from "payload";

import { useState } from "react";

import {
  Button,
  FieldLabel,
  TextInput,
  useField,
  useFormFields,
} from "@payloadcms/ui";

import { slugify } from "@/lib/utils";

type Props = {
  targetField?: string;
  readOnly?: boolean;
} & TextFieldClientProps;

export const SlugGenerator = ({
  targetField = "title",
  readOnly = true,
}: Props) => {
  const { value, setValue } = useField<string>({ path: "slug" });
  const [isLocked, setIsLocked] = useState(readOnly);

  const targetFieldValue = useFormFields(
    ([fields]) => fields[targetField]?.value as string
  );

  const handleClick = () => {
    const formattedSlug = slugify(targetFieldValue);

    if (value !== formattedSlug) {
      setValue(formattedSlug);
    }
  };

  return (
    <div className="mb-5 flex flex-col">
      <div className="flex justify-between gap-x-1 gap-y-2">
        <FieldLabel htmlFor="slug" label="Slug" />
        <Button
          buttonStyle="secondary"
          className="lock-button"
          onClick={() => setIsLocked(!isLocked)}
        >
          {isLocked ? "Desbloquear" : "Bloquear"}
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
