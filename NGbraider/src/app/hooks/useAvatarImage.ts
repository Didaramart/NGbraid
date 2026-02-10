/**
 * Nigerian/African diverse portrait images
 * Using free-to-use images from Unsplash as fallbacks
 */
const nigerianAvatarImages = [
  // Women
  'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  'https://images.unsplash.com/photo-1517331156700-3c241d2b4d83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  'https://images.unsplash.com/photo-1519046904884-53103b34b206?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  'https://images.unsplash.com/photo-1504199786675-eb32988b850d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  // Men
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  'https://images.unsplash.com/photo-1489424731966-fcee0b76055d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  'https://images.unsplash.com/photo-1519085360771-9852ef158dba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
];

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
}

export function getAvatarImageByName(name: string): string {
  const hash = hashString(name || '');
  const index = hash % nigerianAvatarImages.length;
  return nigerianAvatarImages[index];
}

export function useAvatarImage(name: string): string {
  return getAvatarImageByName(name);
}
