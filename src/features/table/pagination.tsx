import Button from "@/common/components/button";
import IconButton from "@/common/components/icon-button";

interface TablePaginationProps {
  page: number;
  setPage: (page: number) => void;
  perPage: number;
  total: number;
  pageCount: number;
  onAdd?: () => void;
  className?: string;
}

export default function TablePagination({ page, setPage, total, pageCount, onAdd, className }: TablePaginationProps) {
  return (
    <div className={`flex items-center justify-end gap-6 bg-white p-3 ${className}`}>
      <div className="flex items-center gap-3">
        <div className="rounded-lg border border-gray-medium p-3">
          <p className="w-10 text-center font-regular  text-p2 text-black">{page}</p>
        </div>
        <p className="font-regular text-p2 text-black">of</p>
        <p className="font-regular text-p2 text-black">{total}</p>
      </div>
      <div className="flex items-center gap-8">
        <div className="flex gap-4">
          <div className="flex items-center justify-center gap-2">
            <IconButton
              variant="ghost"
              name="arrow-left"
              color="black"
              className="!bg-gray-light"
              size={16}
              onClick={() => setPage(Math.max(1, page - 1))}
            />

            <IconButton
              variant="ghost"
              name="arrow-right"
              color="black"
              className="!bg-gray-light"
              size={16}
              onClick={() => setPage(Math.min(pageCount, page + 1))}
            />
          </div>
          {onAdd && <Button onClick={onAdd}>Add Doctor</Button>}
        </div>
      </div>
    </div>
  );
}
