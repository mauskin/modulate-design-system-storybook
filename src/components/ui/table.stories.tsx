import type { Meta, StoryObj } from "@storybook/react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableEmpty,
  tableColActionsClasses,
} from "./table";
import { Button } from "./button";

const meta: Meta<typeof Table> = {
  title: "UI/Table",
  component: Table,
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Table>;

const muted = "text-muted-foreground";

const codeClasses =
  "font-mono text-sm bg-foreground/5 border border-foreground/10 rounded-[0.2rem] px-[0.25em] py-[0.1em] text-foreground";

const tagClasses =
  "inline-flex items-center font-medium leading-none whitespace-nowrap text-sm rounded-sm px-1.5 py-0.5 border border-current/25 bg-transparent";

const tagFlatClasses =
  "inline-flex items-center font-medium leading-none whitespace-nowrap text-xs rounded-md px-1.5 py-0.5 bg-current/15 text-muted-foreground";

export const Default: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Layer</TableHead>
          <TableHead>What it is</TableHead>
          <TableHead>Developer's rule</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell><code className={codeClasses}>Component</code></TableCell>
          <TableCell>A styled UI element, static or interactive.</TableCell>
          <TableCell>Preserve component structure and naming, implement in your own stack.</TableCell>
        </TableRow>
        <TableRow>
          <TableCell><code className={codeClasses}>Token</code></TableCell>
          <TableCell>A named CSS variable storing a single property value.</TableCell>
          <TableCell>Use tokens as-is: don't rename, don't alias, don't generalize.</TableCell>
        </TableRow>
        <TableRow>
          <TableCell><code className={codeClasses}>Pattern</code></TableCell>
          <TableCell>A recurring composition of components and tokens.</TableCell>
          <TableCell>Follow the pattern's intent; extend only at the edges.</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

export const WithActions: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Role</TableHead>
          <TableHead className={tableColActionsClasses}>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Evgeniy Vlasov</TableCell>
          <TableCell>Admin</TableCell>
          <TableCell className={tableColActionsClasses}>
            <div>
              <Button variant="outline" size="s">Edit</Button>
              <Button variant="danger" size="s">Remove</Button>
            </div>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Alex Neeson</TableCell>
          <TableCell>Developer</TableCell>
          <TableCell className={tableColActionsClasses}>
            <div>
              <Button variant="outline" size="s">Edit</Button>
              <Button variant="danger" size="s">Remove</Button>
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

export const KeyValue: Story = {
  render: () => (
    <Table>
      <colgroup>
        <col style={{ width: "30%" }} />
        <col style={{ width: "70%" }} />
      </colgroup>
      <TableBody>
        <TableRow>
          <TableHead>Account ID</TableHead>
          <TableCell><code className={codeClasses}>acc_01HX9…</code></TableCell>
        </TableRow>
        <TableRow>
          <TableHead>Plan</TableHead>
          <TableCell>Pro</TableCell>
        </TableRow>
        <TableRow>
          <TableHead>Billing cycle</TableHead>
          <TableCell>Monthly · renews 1 May 2026</TableCell>
        </TableRow>
        <TableRow>
          <TableHead>Seat limit</TableHead>
          <TableCell>10</TableCell>
        </TableRow>
        <TableRow>
          <TableHead>Created</TableHead>
          <TableCell>12 Jan 2025</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

export const MutedCells: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Key</TableHead>
          <TableHead>Created</TableHead>
          <TableHead>Last used</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell><code className={codeClasses}>sk_live_aX9…</code></TableCell>
          <TableCell>12 Jan 2025</TableCell>
          <TableCell>14 Apr 2026</TableCell>
          <TableCell>Active</TableCell>
        </TableRow>
        <TableRow>
          <TableCell><code className={codeClasses}>sk_live_cQ1…</code></TableCell>
          <TableCell>22 Aug 2024</TableCell>
          <TableCell className={muted}>Never</TableCell>
          <TableCell className={muted}>Inactive</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

export const Baseline: Story = {
  render: () => (
    <Table baseline>
      <TableHeader>
        <TableRow>
          <TableHead>Field</TableHead>
          <TableHead>Value</TableHead>
          <TableHead>Note</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>API Key</TableCell>
          <TableCell>
            <input
              type="text"
              defaultValue="sk_live_aX9…"
              className="bg-background border border-input rounded-md px-2 py-1"
            />
          </TableCell>
          <TableCell>Aligned to text baseline.</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Action</TableCell>
          <TableCell>
            <Button size="s">Save</Button>
          </TableCell>
          <TableCell>Button sits on the same baseline.</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

export const InsideWidget: Story = {
  render: () => (
    <div className="bg-card rounded-lg p-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Key</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Last used</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell><code className={codeClasses}>sk_live_aX9…</code></TableCell>
            <TableCell>12 Jan 2025</TableCell>
            <TableCell>14 Apr 2026</TableCell>
            <TableCell>Active</TableCell>
          </TableRow>
          <TableRow>
            <TableCell><code className={codeClasses}>sk_live_bZ3…</code></TableCell>
            <TableCell>3 Mar 2025</TableCell>
            <TableCell>1 Apr 2026</TableCell>
            <TableCell>Active</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  ),
};

export const WithTags: Story = {
  render: () => (
    <Table>
      <colgroup>
        <col style={{ width: "22%" }} />
        <col style={{ width: "78%" }} />
      </colgroup>
      <TableBody>
        <TableRow>
          <TableHead>Status</TableHead>
          <TableCell><span className={tagClasses}>released</span></TableCell>
        </TableRow>
        <TableRow>
          <TableHead>Type</TableHead>
          <TableCell><span className={tagClasses}>batch</span></TableCell>
        </TableRow>
        <TableRow>
          <TableHead>Accepted formats</TableHead>
          <TableCell className="space-x-1">
            <span className={tagFlatClasses}>aac</span>
            <span className={tagFlatClasses}>flac</span>
            <span className={tagFlatClasses}>mp3</span>
            <span className={tagFlatClasses}>mp4</span>
            <span className={tagFlatClasses}>wav</span>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

export const EmptyState: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead className={tableColActionsClasses}>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableEmpty colSpan={4}>
          <p>No members found.</p>
        </TableEmpty>
      </TableBody>
    </Table>
  ),
};

export const EmptyStateWithCta: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Key</TableHead>
          <TableHead>Created</TableHead>
          <TableHead>Last used</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableEmpty colSpan={4}>
          <p>No active API keys. Create your first key to start making API requests.</p>
          <Button size="s">Create API key</Button>
        </TableEmpty>
      </TableBody>
    </Table>
  ),
};

export const WithCaption: Story = {
  render: () => (
    <Table>
      <TableCaption>Recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">INV001</TableCell>
          <TableCell>Paid</TableCell>
          <TableCell>Credit Card</TableCell>
          <TableCell className="text-right">$250.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">INV002</TableCell>
          <TableCell>Pending</TableCell>
          <TableCell>PayPal</TableCell>
          <TableCell className="text-right">$150.00</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};
