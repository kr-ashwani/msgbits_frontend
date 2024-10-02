export function formatBytes(
  bytes: number,
  decimals: number = 2,
  includeSpace: boolean = true,
): string {
  if (bytes === 0) return `0${includeSpace ? " " : ""}B`;

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const value = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));
  const separator = includeSpace ? " " : "";

  return `${value}${separator}${sizes[i]}`;
}
