// Character data formatters
export const formatAttribute = (value: string): string => {
  return value === "n/a" || value === "unknown" ? "Unknown" : value;
};

export const formatCharacterHeight = (height: string): string => {
  const formatted = formatAttribute(height);
  return formatted !== "Unknown" ? `${formatted} cm` : formatted;
};

export const formatCharacterMass = (mass: string): string => {
  const formatted = formatAttribute(mass);
  return formatted !== "Unknown" ? `${formatted} kg` : formatted;
};

export const formatCharacterBirthYear = (birthYear: string): string => {
  return formatAttribute(birthYear);
};

export const formatCharacterGender = (gender: string): string => {
  return formatAttribute(gender);
};

// Avatar utilities
export const getAvatarColor = (name: string): string => {
  const avatarColors = [
    "#f44336", // red
    "#e91e63", // pink
    "#9c27b0", // purple
    "#673ab7", // deep purple
    "#3f51b5", // indigo
    "#2196f3", // blue
    "#03a9f4", // light blue
    "#00bcd4", // cyan
    "#009688", // teal
    "#4caf50", // green
    "#8bc34a", // light green
    "#cddc39", // lime
    "#ffeb3b", // yellow
    "#ffc107", // amber
    "#ff9800", // orange
    "#ff5722", // deep orange
  ];
  const index = name.length % avatarColors.length;
  return avatarColors[index];
};

export const getAvatarInitial = (name: string): string => {
  return name.charAt(0).toUpperCase();
};

// Gender color utilities
export const getGenderColor = (gender: string): string => {
  const normalizedGender = gender.toLowerCase();
  
  switch (normalizedGender) {
    case 'male':
      return '#2196f3'; // info color
    case 'female':
      return '#4caf50'; // success color
    case 'hermaphrodite':
      return '#ff9800'; // warning color
    default:
      return '#b0b0b0'; // secondary text color
  }
};

// Search utilities
export const extractCharacterId = (url: string): string | null => {
  const match = url.match(/\/people\/(\d+)\//);
  return match ? match[1] : null;
};

// Pagination utilities
export const formatResultsSummary = (
  count: number,
  total: number,
  searchTerm?: string
): string => {
  if (searchTerm) {
    return `Showing ${count} result${count !== 1 ? 's' : ''} for "${searchTerm}"`;
  }
  return `Showing ${count} of ${total} characters`;
};

// Film count utilities
export const formatFilmCount = (count: number): string => {
  return `Appeared in ${count} film${count !== 1 ? 's' : ''}`;
};

export const formatSpeciesCount = (count: number): string => {
  return count === 0 ? "No species data" : `${count} species`;
};

export const formatVehiclesCount = (count: number): string => {
  return count === 0 ? "No vehicles" : `${count} vehicles`;
};

export const formatStarshipsCount = (count: number): string => {
  return count === 0 ? "No starships" : `${count} starships`;
}; 