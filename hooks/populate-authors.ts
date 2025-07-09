import type { CollectionAfterReadHook } from 'payload';
import type { User } from '@/payload-types';

// The `user` collection has access control locked so that users are not publicly accessible
// This means that we need to populate the authors manually here to protect user privacy
// GraphQL will not return mutated user data that differs from the underlying schema
// So we use an alternative `populatedAuthors` field to populate the user data, hidden from the admin UI
export const populateAuthors: CollectionAfterReadHook = async ({
  doc,
  req,
  req: { payload },
}) => {
  if (doc?.authors) {
    const authorPromises = doc.authors.map(
      async (author: { id: number } | number) => {
        const authorDoc = await payload.findByID({
          id: typeof author === 'object' ? author?.id : author,
          collection: 'users',
          depth: 0,
          req,
        });

        return authorDoc;
      }
    );

    const authorDocs = await Promise.all(authorPromises);
    const validAuthorDocs = authorDocs.filter((authorDoc): authorDoc is User =>
      Boolean(authorDoc)
    );

    doc.populatedAuthors = validAuthorDocs.map((authorDoc) => ({
      id: authorDoc.id,
      name: authorDoc.name,
    }));
  }

  return doc;
};
