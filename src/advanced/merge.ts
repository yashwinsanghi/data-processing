/**
 * Enum representing different merge modes for DataFrame merging.
 */
export enum MergeMode {
  /**
   * INNER: Only include rows with matching values in both DataFrames.
   */
  INNER = "INNER",

  /**
   * LEFT: Include all rows from the left DataFrame and the matched rows from the right DataFrame.
   */
  LEFT = "LEFT",

  /**
   * RIGHT: Include all rows from the right DataFrame and the matched rows from the left DataFrame.
   */
  RIGHT = "RIGHT",

  /**
   * FULL: Include all rows from both DataFrames, filling in missing values with null where necessary.
   */
  FULL = "FULL",
}

/**
 * @class Merge
 * @description
 * The Merge class provides methods for merging two arrays of objects
 * based on specified column names and merge modes.
 **/
export class Merge {
  /**
   * The function `merge` takes two arrays of objects, a source and a target, along with two column
   * names and a merge mode, and returns a merged array based on the specified mode.
   * @param {Record<string, any>[]} source - An array of objects representing the source DataFrame.
   * @param {Record<string, any>[]} target - The `target` parameter is an array of objects representing
   * the target DataFrame. Each object in the array represents a row in the DataFrame, with keys
   * representing column names and values representing the corresponding values in that row.
   * @param {string} sourceColumn - The `sourceColumn` parameter is a string that specifies the column
   * in the source DataFrame that will be used for merging.
   * @param {string} targetColumn - The `targetColumn` parameter is a string that specifies the column
   * in the `target` DataFrame that will be used for merging.
   * @param {MergeMode} mode - The `mode` parameter is of type `MergeMode` and determines the type of
   * merge operation to perform. It can have one of the following values:
   * @returns an array of merged records.
   */
  merge(
    source: Record<string, any>[],
    target: Record<string, any>[],
    sourceColumn: string,
    targetColumn: string,
    mode: MergeMode
  ): Record<string, any>[] {
    if (!source || source.length === 0) {
      throw new Error("Source DataFrame is either not provided or is empty.");
    }
    if (!target || target.length === 0) {
      throw new Error("Target DataFrame is either not provided or is empty.");
    }
    if (!sourceColumn || sourceColumn.length === 0) {
      throw new Error("Source column must be specified.");
    }
    if (!targetColumn || targetColumn.length === 0) {
      throw new Error("Target column must be specified.");
    }
    if (!mode || mode.length === 0) {
      throw new Error("Merge mode must be specified.");
    }
    if (!source[0].hasOwnProperty(sourceColumn)) {
      throw new Error(
        `Source column ${sourceColumn} is not a valid column in source DataFrame.`
      );
    }
    if (!target[0].hasOwnProperty(targetColumn)) {
      throw new Error(
        `Target column ${targetColumn} is not a valid column in target DataFrame.`
      );
    }
    switch (mode) {
      case MergeMode.INNER: {
        return this.inner(source, target, sourceColumn, targetColumn);
      }
      case MergeMode.LEFT: {
        return this.left(source, target, sourceColumn, targetColumn);
      }
      case MergeMode.RIGHT: {
        return this.right(source, target, sourceColumn, targetColumn);
      }
      case MergeMode.FULL: {
        return this.full(source, target, sourceColumn, targetColumn);
      }
      default: {
        throw new Error("Invalid merge mode.");
      }
    }
  }

  /**
   * The `inner` function merges records in the SQL inner join fasion
   * from two arrays based on matching values in specified columns.
   * @param {Record<string, any>[]} source - An array of records (objects) from the source dataset.
   * Each record is represented as a key-value pair, where the key is a string and the value can be of
   * any type.
   * @param {Record<string, any>[]} target - The `target` parameter is an array of `Record<string,
   * any>` objects. Each object represents a target record that we want to merge with the source
   * records.
   * @param {string} sourceColumn - The `sourceColumn` parameter is a string that represents the column
   * name in the `source` array of records. This column will be used to find matching records in the
   * `target` array.
   * @param {string} targetColumn - The `targetColumn` parameter is a string that represents the column
   * name in the `target` array of records. This column will be used to find matching records in the
   * `source` array based on the value of the corresponding column in the `source` array.
   * @returns an array of merged records.
   */
  private inner(
    source: Record<string, any>[],
    target: Record<string, any>[],
    sourceColumn: string,
    targetColumn: string
  ): Record<string, any>[] {
    const mergedRecords: Record<string, any>[] = [];

    for (const sourceRecord of source) {
      const matchingTargetRecords = target.filter((targetRecord) => {
        return sourceRecord[sourceColumn] === targetRecord[targetColumn];
      });

      for (const matchingTargetRecord of matchingTargetRecords) {
        mergedRecords.push({ ...sourceRecord, ...matchingTargetRecord });
      }
    }

    return mergedRecords;
  }

  /**
   * The `left` function merges two arrays of records based on a specified column, returning a new
   * array with matching records merged and non-matching records with a null value for the target
   * column.
   * @param {Record<string, any>[]} source - An array of records from the source dataset.
   * @param {Record<string, any>[]} target - The `target` parameter is an array of records of type
   * `Record<string, any>`. Each record in the `target` array is an object with string keys and any
   * values.
   * @param {string} sourceColumn - The sourceColumn parameter is a string that represents the column
   * name in the source array of records.
   * @param {string} targetColumn - The `targetColumn` parameter is a string that represents the column
   * name in the `target` array of records. This column will be used to match records between the
   * `source` and `target` arrays.
   * @returns an array of merged records.
   */
  private left(
    source: Record<string, any>[],
    target: Record<string, any>[],
    sourceColumn: string,
    targetColumn: string
  ): Record<string, any>[] {
    const mergedRecords: Record<string, any>[] = [];

    for (const sourceRecord of source) {
      const matchingTargetRecords = target.filter((targetRecord) => {
        return sourceRecord[sourceColumn] === targetRecord[targetColumn];
      });

      if (matchingTargetRecords && matchingTargetRecords.length > 0) {
        for (const matchingTargetRecord of matchingTargetRecords) {
          mergedRecords.push({ ...sourceRecord, ...matchingTargetRecord });
        }
      } else {
        mergedRecords.push({ ...sourceRecord });
      }
    }

    return mergedRecords;
  }

  /**
   * The `right` function merges two arrays of records based on a specified column, with the target
   * array being the primary source and any missing records in the source array being represented with
   * null values.
   * @param {Record<string, any>[]} source - An array of records representing the source data. Each
   * record is a key-value pair where the key is a string representing the column name and the value is
   * the corresponding data for that column.
   * @param {Record<string, any>[]} target - An array of target records, where each record is
   * represented as a `Record<string, any>`. The target records are the records that we want to merge
   * with the source records.
   * @param {string} sourceColumn - The `sourceColumn` parameter is a string that represents the column
   * name in the `source` array of records. This column will be used to match records between the
   * `source` and `target` arrays.
   * @param {string} targetColumn - The `targetColumn` parameter is a string that represents the column
   * name in the `target` array of records. This column will be used to match records between the
   * `source` and `target` arrays.
   * @returns an array of merged records.
   */
  private right(
    source: Record<string, any>[],
    target: Record<string, any>[],
    sourceColumn: string,
    targetColumn: string
  ): Record<string, any>[] {
    const mergedRecords: Record<string, any>[] = [];

    for (const targetRecord of target) {
      const matchingSourceRecords = source.filter((sourceRecord) => {
        return targetRecord[targetColumn] === sourceRecord[sourceColumn];
      });

      if (matchingSourceRecords && matchingSourceRecords.length > 0) {
        for (const matchingSourceRecord of matchingSourceRecords) {
          mergedRecords.push({ ...matchingSourceRecord, ...targetRecord });
        }
      } else {
        mergedRecords.push({ ...targetRecord });
      }
    }

    return mergedRecords;
  }

  /**
   * The `full` function merges two arrays of records based on a specified column, including records
   * that have a match in one array but not the other.
   * @param {Record<string, any>[]} source - An array of records from the source dataset.
   * @param {Record<string, any>[]} target - An array of target records, where each record is
   * represented as a key-value pair object.
   * @param {string} sourceColumn - The `sourceColumn` parameter is a string that represents the column
   * name in the `source` array of records. This column will be used to find matching records in the
   * `target` array.
   * @param {string} targetColumn - The `targetColumn` parameter is a string that represents the column
   * name in the `target` array of records. This column will be used to match records between the
   * `source` and `target` arrays.
   * @returns an array of merged records.
   */
  private full(
    source: Record<string, any>[],
    target: Record<string, any>[],
    sourceColumn: string,
    targetColumn: string
  ): Record<string, any>[] {
    const mergedRecords: Record<string, any>[] = [];

    const sourceSet = new Set(source.map((record) => record[sourceColumn]));
    const targetSet = new Set(target.map((record) => record[targetColumn]));

    const allUniqueKeys = new Set([...sourceSet, ...targetSet]);

    for (const key of allUniqueKeys) {
      const sourceRecords = source.filter(
        (record) => record[sourceColumn] === key
      );
      const targetRecords = target.filter(
        (record) => record[targetColumn] === key
      );

      if (sourceRecords.length > 0 && targetRecords.length > 0) {
        // Combine source and target records into one
        for (const sourceRecord of sourceRecords) {
          for (const targetRecord of targetRecords) {
            mergedRecords.push({ ...sourceRecord, ...targetRecord });
          }
        }
      } else if (sourceRecords.length > 0) {
        // Only source records exist
        for (const sourceRecord of sourceRecords) {
          mergedRecords.push({ ...sourceRecord });
        }
      } else if (targetRecords.length > 0) {
        // Only target records exist
        for (const targetRecord of targetRecords) {
          mergedRecords.push({ ...targetRecord });
        }
      }
    }

    return mergedRecords;
  }
}
