import type {
  CollectionBeforeChangeHook,
  CollectionSlug,
  PayloadRequest,
} from 'payload';
import type { Page } from '@/payload-types';

export const autoAssignOrder: CollectionBeforeChangeHook<Page> = async ({
  req,
  operation,
  data,
  collection,
  originalDoc,
}) => {
  const newData = { ...data };
  const userOrder =
    typeof data.order === 'number' && data.order > 0 ? data.order : 0;
  const isCreating = operation === 'create';

  if (userOrder <= 0) {
    newData.order = await getNextOrder(req, collection.slug);
    data.order = newData.order;
  } else {
    const currentOrderInDb = isCreating ? 0 : originalDoc?.order || 0;

    if (userOrder !== currentOrderInDb || isCreating) {
      await shiftDocuments(
        req,
        collection.slug,
        userOrder,
        originalDoc,
        isCreating
      );
      newData.order = userOrder;
    } else {
      newData.order = userOrder;
    }
  }
  return newData;
};

async function getNextOrder(
  req: PayloadRequest,
  collectionSlug: CollectionSlug
): Promise<number> {
  const result = await req.payload.find({
    collection: collectionSlug,
    sort: '-order',
    limit: 1,
    depth: 0,
  });

  const lastDoc = result.docs.at(0);
  let nextOrder = 1;
  if (lastDoc && 'order' in lastDoc && typeof lastDoc.order === 'number') {
    nextOrder = lastDoc.order + 1;
  }
  return nextOrder;
}

async function shiftDocuments(
  req: PayloadRequest,
  collectionSlug: CollectionSlug,
  userOrder: number,
  originalDoc: Page | undefined,
  isCreating: boolean
): Promise<void> {
  const documentsToConsiderShifting = await req.payload.find({
    collection: collectionSlug,
    where: {
      order: {
        greater_than_equal: userOrder,
      },
    },
    sort: 'order',
    limit: 0,
    depth: 0,
  });

  // biome-ignore lint/suspicious/noEvolvingTypes: lazy
  const updatePromises = [];
  let expectedSequentialOrder = userOrder;

  for (const docToShift of documentsToConsiderShifting.docs) {
    if ('order' in docToShift === false) {
      return;
    }

    if (!isCreating && originalDoc && docToShift.id === originalDoc.id) {
      continue;
    }

    if (typeof docToShift.order !== 'number') {
      continue;
    }

    if (docToShift.order === expectedSequentialOrder) {
      updatePromises.push(
        req.payload.update({
          collection: collectionSlug,
          id: docToShift.id,
          data: {
            order: docToShift.order + 1,
          },
          depth: 0,
        })
      );
      expectedSequentialOrder++;
    } else if (docToShift.order > expectedSequentialOrder) {
      break;
    }
  }

  await Promise.all(updatePromises);
}
