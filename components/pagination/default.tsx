import Link from "next/link";

import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react/dist/ssr";

import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@/components/ui/pagination";

export default function PaginationDemo() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <Button asChild variant="ghost">
            <Link href="#">
              <CaretLeftIcon className="rtl:rotate-180" /> Preview
            </Link>
          </Button>
        </PaginationItem>
        <PaginationItem>
          <Button asChild mode="icon" variant="ghost">
            <Link href="#">1</Link>
          </Button>
        </PaginationItem>
        <PaginationItem>
          <Button asChild mode="icon" variant="outline">
            <Link href="#">2</Link>
          </Button>
        </PaginationItem>
        <PaginationItem>
          <Button asChild mode="icon" variant="ghost">
            <Link href="#">3</Link>
          </Button>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <Button asChild variant="ghost">
            <Link href="#">
              Next <CaretRightIcon className="rtl:rotate-180" />
            </Link>
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
