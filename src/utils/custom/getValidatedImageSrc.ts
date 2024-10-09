import nextConfig from "../../../next.config.mjs";
// Types
import type { NextConfig } from "next";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import type { RemotePattern } from "next/dist/shared/lib/image-config";

interface ImageConfig {
  remotePatterns?: RemotePattern[];
}

interface TypedNextConfig extends NextConfig {
  images?: ImageConfig;
}

// Constants
const typedConfig = nextConfig as TypedNextConfig;
export const FALLBACK_IMAGE = "/assets/fallbackImage.png";

// Utility functions
function isAllowedByRemotePattern(
  hostname: string,
  pattern: RemotePattern,
): boolean {
  return (
    pattern.hostname === hostname ||
    (pattern.hostname.startsWith("*") &&
      hostname.endsWith(pattern.hostname.slice(1)))
  );
}

export function validateImageUrl(
  urlString: string | StaticImport,
  fallbackUrl: string = "",
): string | StaticImport {
  if (typeof urlString !== "string") return urlString;
  const urlsToTry = [urlString, fallbackUrl, FALLBACK_IMAGE];
  const remotePatterns = typedConfig.images?.remotePatterns || [];

  for (const url of urlsToTry) {
    try {
      // Handle relative URLs
      if (url.startsWith("/") || url.startsWith("blob")) {
        return url;
      }

      const parsedUrl = new URL(url);

      const isAllowed = remotePatterns.some((pattern) =>
        isAllowedByRemotePattern(parsedUrl.hostname, pattern),
      );

      if (isAllowed) {
        return url;
      }
    } catch (error) {
      continue; // Try the next URL if this one is invalid
    }
  }

  return FALLBACK_IMAGE;
}
