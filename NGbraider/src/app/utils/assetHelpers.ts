import { useEffect, useState } from 'react';

export function slugifyName(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

export function getLocalAvatarPath(name: string) {
  const slug = slugifyName(name);
  return `/assets/avatars/${slug}.jpg`;
}

export function useImageWithFallback(localPath: string, remoteUrl: string) {
  const [src, setSrc] = useState(localPath);

  useEffect(() => {
    let mounted = true;
    const img = new Image();
    img.onload = () => {
      if (mounted) setSrc(localPath);
    };
    img.onerror = () => {
      if (mounted) setSrc(remoteUrl);
    };
    img.src = localPath;

    return () => {
      mounted = false;
    };
  }, [localPath, remoteUrl]);

  return src;
}
