import { cn } from '@/lib/utils';

const defaultLabels = {
  plural: 'Docs',
  singular: 'Doc',
};

const defaultCollectionLabels: {
  [key: string]: { plural: string; singular: string };
} = {
  posts: {
    plural: 'Posts',
    singular: 'Post',
  },
};

type Props = {
  className?: string;
  collection?: string;
  collectionLabels?: {
    plural?: string;
    singular?: string;
  };
  currentPage?: number;
  limit?: number;
  totalDocs?: number;
};

export const PageRange = ({
  className,
  collection,
  collectionLabels: collectionLabelsFromProps,
  currentPage,
  limit,
  totalDocs,
}: Props) => {
  const calculateIndexStart = () => {
    let indexStart = (currentPage ? currentPage - 1 : 1) * (limit || 1) + 1;
    if (totalDocs && indexStart > totalDocs) {
      indexStart = 0;
    }
    return indexStart;
  };

  const calculateIndexEnd = () => {
    let indexEnd = (currentPage || 1) * (limit || 1);
    if (totalDocs && indexEnd > totalDocs) {
      indexEnd = totalDocs;
    }
    return indexEnd;
  };

  const getLabels = () => {
    return (
      collectionLabelsFromProps ||
      defaultCollectionLabels[collection || ''] ||
      defaultLabels ||
      {}
    );
  };

  const indexStart = calculateIndexStart();
  const indexEnd = calculateIndexEnd();
  const { plural, singular } = getLabels();

  return (
    <div className={cn('container mb-8 font-semibold', className)}>
      {typeof totalDocs !== 'undefined' && totalDocs > 0
        ? `Showing ${indexStart}${indexStart > 0 ? ` - ${indexEnd}` : ''} de ${totalDocs} ${
            totalDocs > 1 ? plural : singular
          }`
        : 'Search without results.'}
    </div>
  );
};
