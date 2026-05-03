import clsx from "clsx";

type Pagination = {
  totalPages: number;
};

type Page = {
  page: number;
  pagination: Pagination;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

export default function PageChanger({ page, pagination, setPage }: Page) {
  return (
    <div className={clsx("flex justify-center items-center")}>
      <div className="flex items-center gap-6">
        <button
          className={clsx("bg-[#efefef] px-3 py-2 rounded-[5px]")}
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
        >
          Prev
        </button>

        <span>
          Page {page} of {pagination?.totalPages || 1}
        </span>

        <button
          className={clsx("bg-[#efefef] px-3 py-2 rounded-[5px]")}
          onClick={() =>
            setPage((p) =>
              pagination?.totalPages
                ? Math.min(p + 1, pagination.totalPages)
                : p,
            )
          }
          disabled={page === pagination?.totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
