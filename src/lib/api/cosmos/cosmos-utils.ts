/**
 * Given a remote URL like:
 *   https://cdn.shopify.com/s/files/1/0000/products/blue_shirt.jpg
 * returns:
 *   /cosmos/cdn/s/files/1/0000/products/blue_shirt.jpg
 */
export function localizeImageSrc(
  src: string,
  basePath = "/cosmos/cdn"
): string {
  try {
    const u = new URL(src);
    // remove domain: keep everything after host (leading slash removed)
    const path = u.pathname.replace(/^\/+/, "");
    return `${basePath}/${path}`;
  } catch {
    // if it's already a relative path or another scheme, return it as-is
    return src;
  }
}
