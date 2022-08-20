export function startAndEnd(str: string | undefined, gapStart: number, gapEnd: number) {
  const lngth = 20;
  const gapMin = 0;
  if (str && str.length > lngth) {
    return `${str.substr(gapMin, gapStart)}...${str.substr(str.length - gapEnd, str.length)}`;
  }
  return str;
}

export function redirect(url: string): void {
  if (typeof window !== 'undefined') {
    window.location.href = url;
  }
}
