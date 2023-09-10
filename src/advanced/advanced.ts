export enum MergeModes {
  "INNER",
  "LEFT",
  "RIGHT",
  "FULL",
}
export class AdvancedOperations {
  merge(
    source: Record<string, any>[],
    target: Record<string, any>[],
    columns: string[],
    mergeMode: MergeModes
  ): Record<string, any>[] {
    return [];
  }
}
