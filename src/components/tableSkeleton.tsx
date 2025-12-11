import { Skeleton } from './ui/skeleton';
import { TableCell, TableRow } from './ui/table';

export const TableSkeleton = ({ cols = 8, rows = 7 }: { cols?: number; rows?: number }) => {
  return [...Array(rows)].map((_, index) => (
    <TableRow key={index}>
      {[...Array(cols)].map((_, i) => (
        <TableCell key={i}>
          <Skeleton className="h-4 w-full rounded" />
        </TableCell>
      ))}
    </TableRow>
  ));
};
