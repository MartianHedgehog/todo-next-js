import { DEFAULT_COLUMNS } from "./constants";
import { UniqueIdentifier } from "@dnd-kit/core";

export type ColumnId = (typeof DEFAULT_COLUMNS)[number]["status"];

export const COLUMN_IDS = DEFAULT_COLUMNS.map((column) => ({
  id: column.status as UniqueIdentifier,
}));
