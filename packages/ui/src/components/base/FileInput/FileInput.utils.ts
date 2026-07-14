export const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) {
    return `${String(bytes)} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${String(Math.round(bytes / 1024))} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

export const matchesAccept = (file: File, accept?: string): boolean => {
  if (!accept) {
    return true;
  }

  const tokens = accept
    .split(',')
    .map((token) => token.trim())
    .filter(Boolean);

  if (tokens.length === 0) {
    return true;
  }

  return tokens.some((token) => {
    if (token.startsWith('.')) {
      return file.name.toLowerCase().endsWith(token.toLowerCase());
    }

    if (token.endsWith('/*')) {
      const prefix = token.slice(0, -1);
      return file.type.startsWith(prefix);
    }

    return file.type === token;
  });
};
