import type { Block } from 'payload';

export type IconType = 'x-mark' | 'check' | 'arrow';

export const TwinListBlock: Block = {
  slug: 'twinLists',
  interfaceName: 'TwinListBlock',
  fields: [
    {
      name: 'leftList',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'list',
          type: 'array',
          minRows: 1,
          admin: {
            components: {
              RowLabel: {
                path: '@/admin-components/fields/array-row-label#ArrayRowLabel',
                clientProps: {
                  targetField: 'subtitle',
                },
              },
            },
          },
          fields: [
            {
              name: 'subtitle',
              type: 'text',
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
              admin: {
                rows: 4,
              },
            },
            {
              name: 'icon',
              type: 'select',
              options: [
                {
                  label: 'X-mark',
                  value: 'x-mark',
                },
                {
                  label: 'Check',
                  value: 'check',
                },
                {
                  label: 'Arrow',
                  value: 'arrow',
                },
              ],
              defaultValue: 'arrow',
            },
          ],
        },
      ],
    },
    {
      name: 'rightList',
      type: 'group',
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        {
          name: 'list',
          type: 'array',
          minRows: 1,
          admin: {
            components: {
              RowLabel: {
                path: '@/admin-components/fields/array-row-label#ArrayRowLabel',
                clientProps: {
                  targetField: 'subtitle',
                },
              },
            },
          },
          fields: [
            {
              name: 'subtitle',
              type: 'text',
              required: true,
            },
            {
              name: 'description',
              type: 'textarea',
              admin: {
                rows: 4,
              },
            },
            {
              name: 'icon',
              type: 'select',
              options: [
                {
                  label: 'X-mark',
                  value: 'x-mark',
                },
                {
                  label: 'Check',
                  value: 'check',
                },
                {
                  label: 'Arrow',
                  value: 'arrow',
                },
              ],
              defaultValue: 'arrow',
            },
          ],
        },
      ],
    },
  ],
};
