export function formatBytes(bytes: number) {
  if (bytes >= 1000000000) {
    return `${Number(bytes / 1000000000).toFixed(1)}GB`;
  } else if (bytes >= 1000000) {
    return `${Number(bytes / 1000000).toFixed(1)}MB`;
  } else if (bytes >= 1000) {
    return `${Number(bytes / 1000).toFixed(1)}KB`;
  } else {
    return `${Number(bytes).toFixed(0)}Bytes`;
  }
}

export function formatSpeeds(bytes: number, seconds: number) {
  if (seconds === 0 || bytes === 0) return "";
  return `${formatBytes(bytes)}, ${formatBytes(bytes / seconds)}/s ${Number(
    ((bytes / seconds) * 8) / (1024 * 1024)
  ).toFixed(1)}Mbps`;
}
