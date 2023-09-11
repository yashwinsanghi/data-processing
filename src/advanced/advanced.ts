import { Merge, MergeMode } from "./merge";
export { MergeMode } from "./merge";

/**
 * @class AdvancedOperations
 * @description
 * The `AdvancedOperations` class provides a wrapper method mode to
 * 1. Merge two arrays of objects based on a specified merge mode. See {@link MergeMode} for more details.
 */
export class AdvancedOperations {
  /**
   * The function takes in two arrays of objects, source and target, along with specified columns, and
   * merges them based on a specified merge mode.
   * @param {Record<string, any>[]} source - An array of objects representing the source data.
   * @param {Record<string, any>[]} target - The `target` parameter is an array of objects representing
   * the target dataset.
   * @param {string | string[]} sourceColumns - The `sourceColumns` parameter is the column(s) in the
   * source dataset that you want to use for merging. It can be a single column name as a string or an
   * array of column names.
   * @param {string | string[]} targetColumns - The `targetColumns` parameter is the list of columns in
   * the target array that will be used for merging. It can be a single column name as a string or an
   * array of column names.
   * @param {MergeMode} mergeMode - The `mergeMode` parameter is an enum that specifies how the merging
   * should be performed. It can have one of the following values:
   * @returns an array of records, where each record is a merged combination of the source and target
   * records based on the specified merge mode.
   */
  merge(
    source: Record<string, any>[],
    target: Record<string, any>[],
    sourceColumn: string,
    targetColumn: string,
    mergeMode: MergeMode
  ): Record<string, any>[] {
    return new Merge().merge(
      source,
      target,
      sourceColumn,
      targetColumn,
      mergeMode
    );
  }
}
