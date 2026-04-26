import * as React from "react";

import { cn } from "@/lib/utils";

const cellBorder = "border-b border-b-foreground/10";

export interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  baseline?: boolean;
}

const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className, baseline, ...props }, ref) => (
    <table
      ref={ref}
      className={cn(
        "w-full border-separate border-spacing-0 bg-inherit",
        "[&_tbody_tr:last-child>td]:border-b-0 [&_tbody_tr:last-child>th]:border-b-0",
        baseline && "[&_td]:align-baseline [&_th]:align-baseline",
        className
      )}
      {...props}
    />
  )
);
Table.displayName = "Table";

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn(className)} {...props} />
));
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody ref={ref} className={cn(className)} {...props} />
));
TableBody.displayName = "TableBody";

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot ref={ref} className={cn("font-medium", className)} {...props} />
));
TableFooter.displayName = "TableFooter";

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr ref={ref} className={cn(className)} {...props} />
));
TableRow.displayName = "TableRow";

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "text-left align-top",
      "pt-[0.3rem] pr-[0.5rem] pb-[0.3rem] pl-0",
      "text-sm font-medium text-muted-foreground",
      "sticky top-0 bg-inherit",
      cellBorder,
      className
    )}
    {...props}
  />
));
TableHead.displayName = "TableHead";

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      "text-left align-top",
      "pt-[0.3rem] pr-[0.5rem] pb-[0.7rem] pl-0",
      cellBorder,
      className
    )}
    {...props}
  />
));
TableCell.displayName = "TableCell";

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn(
      "mt-4 text-left text-sm text-muted-foreground",
      className
    )}
    {...props}
  />
));
TableCaption.displayName = "TableCaption";

/* Mirrors DS `.m__col-actions` — apply to both th and td of an actions column. */
export const tableColActionsClasses =
  "text-right pr-0 w-[1%] whitespace-nowrap " +
  "[&>div]:flex [&>div]:items-center [&>div]:justify-end [&>div]:gap-[0.375rem]";

export interface TableEmptyProps
  extends React.TdHTMLAttributes<HTMLTableCellElement> {
  colSpan: number;
}

const TableEmpty = React.forwardRef<HTMLTableCellElement, TableEmptyProps>(
  ({ className, colSpan, children, ...props }, ref) => (
    <tr>
      <td ref={ref} colSpan={colSpan} className={cn("p-0", className)} {...props}>
        <div className="flex flex-col items-center gap-3 py-10 text-center text-muted-foreground [&_p]:m-0 [&_p]:max-w-[28rem]">
          {children}
        </div>
      </td>
    </tr>
  )
);
TableEmpty.displayName = "TableEmpty";

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
  TableEmpty,
};
