import Link from "next/link";

import {
  CaretLeftIcon,
  CaretLineLeftIcon,
  CaretLineRightIcon,
  CaretRightIcon,
} from "@phosphor-icons/react/dist/ssr";

import { Button } from "@/components/ui/base-button";
import { Card } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@/components/ui/pagination";

type Props = {
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  className?: string;
};

export const BlogPagination = ({
  totalPages,
  currentPage,
  hasNextPage,
  hasPrevPage,
  className,
}: Props) => {
  if (totalPages < 2) {
    return null;
  }

  return (
    <Card className={className}>
      <Pagination>
        <PaginationContent className="p-1">
          <PaginationItem>
            <Button
              asChild
              disabled={currentPage === 1}
              mode="icon"
              variant="ghost"
            >
              <Link href="/blog">
                <CaretLineLeftIcon />
              </Link>
            </Button>
          </PaginationItem>

          <PaginationItem>
            <Button asChild disabled={!hasPrevPage} mode="icon" variant="ghost">
              <Link href={`/blog/${currentPage - 1}`}>
                <CaretLeftIcon />
              </Link>
            </Button>
          </PaginationItem>

          {hasPrevPage ? (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          ) : null}

          <PaginationItem>
            <Button asChild disabled={hasPrevPage} mode="icon" variant="ghost">
              <Link href={`/blog/${currentPage - 1}`}>
                {hasPrevPage ? currentPage - 1 : "1"}
              </Link>
            </Button>
          </PaginationItem>

          <PaginationItem>
            <Button asChild mode="icon" selected={true} variant="ghost">
              <span>{currentPage}</span>
            </Button>
          </PaginationItem>

          <PaginationItem>
            <Button asChild disabled={hasNextPage} mode="icon" variant="ghost">
              <Link href={`/blog/${currentPage + 1}`}>
                {hasNextPage ? currentPage + 1 : totalPages}
              </Link>
            </Button>
          </PaginationItem>

          {hasNextPage ? (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          ) : null}

          <PaginationItem>
            <Button asChild disabled={!hasPrevPage} mode="icon" variant="ghost">
              <Link href={`/blog/${currentPage - 1}`}>
                <CaretRightIcon />
              </Link>
            </Button>
          </PaginationItem>

          <PaginationItem>
            <Button asChild mode="icon" variant="ghost">
              <Link href={`/blog/${totalPages}`}>
                <CaretLineRightIcon />
              </Link>
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </Card>
  );
};
