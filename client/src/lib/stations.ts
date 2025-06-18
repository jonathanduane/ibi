export const getStationInitials = (name: string): string => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 3);
};

export const categories = [
  { id: 'all', name: 'All Stations', icon: 'radio' },
  { id: 'music', name: 'Music', icon: 'music' },
  { id: 'news', name: 'News', icon: 'newspaper' },
  { id: 'talk', name: 'Talk', icon: 'microphone' },
  { id: 'popular', name: 'Popular', icon: 'star' },
];

export const generateUserId = (): string => {
  return 'user_' + Math.random().toString(36).substr(2, 9);
};
