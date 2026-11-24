export type KitType = "Home" | "Away" | "Third" | "Goalkeeper";
export type KitArchiveRecord = {
  id: string;
  club: string;
  league: string;
  season: "2025/26";
  kitType: KitType;
  manufacturer: string | null;
  manufacturerSource: string | null;
  shirtSponsor: string | null;
  frontImage: string | null;
  backImage: string | null;
  frontImageStatus: "pending";
  backImageStatus: "pending";
  imageRightsStatus: "not-cleared";
};

// This is a catalogue index, not a claim that every kit or image is available.
// Image URLs remain empty until the exact shirt views are verified and usage rights are cleared.
const clubRows: Array<[string, string, string | null, string | null]> = [
  ["Arsenal FC", "Premier League", "adidas", "https://www.footballkitarchive.com/adidas-kits-2025-26-b28/"],
  ["Manchester United", "Premier League", "adidas", "https://www.footballkitarchive.com/adidas-kits-2025-26-b28/"],
  ["Chelsea FC", "Premier League", "Nike", "https://www.footballkitarchive.com/nike-kits-2025-26-b726/"],
  ["Liverpool FC", "Premier League", "adidas", "https://www.footballkitarchive.com/adidas-kits-2025-26-b28/"],
  ["Manchester City", "Premier League", "Puma", "https://www.footballkitarchive.com/puma-kits-2025-26-b846/"],
  ["Tottenham Hotspur", "Premier League", "Nike", "https://www.footballkitarchive.com/nike-kits-2025-26-b726/"],
  ["Aston Villa", "Premier League", "adidas", "https://www.footballkitarchive.com/adidas-kits-2025-26-b28/"],
  ["FC Barcelona", "La Liga", "Nike", "https://www.footballkitarchive.com/nike-kits-2025-26-b726/"],
  ["Real Madrid", "La Liga", "adidas", "https://www.footballkitarchive.com/adidas-kits-2025-26-b28/"],
  ["Atlético de Madrid", "La Liga", null, null],
  ["Juventus FC", "Serie A", "adidas", "https://www.footballkitarchive.com/adidas-kits-2025-26-b28/"],
  ["Inter Milan", "Serie A", "Nike", "https://www.footballkitarchive.com/nike-kits-2025-26-b726/"],
  ["AC Milan", "Serie A", "Puma", "https://www.footballkitarchive.com/puma-kits-2025-26-b846/"],
  ["SSC Napoli", "Serie A", "EA7", "https://jerseysarchive.com/seasons/2025"],
  ["AS Roma", "Serie A", "adidas", "https://www.footballkitarchive.com/adidas-kits-2025-26-b28/"],
  ["FC Bayern München", "Bundesliga", "adidas", "https://www.footballkitarchive.com/adidas-kits-2025-26-b28/"],
  ["Borussia Dortmund", "Bundesliga", "Puma", "https://www.footballkitarchive.com/puma-kits-2025-26-b846/"],
  ["Bayer 04 Leverkusen", "Bundesliga", null, null],
  ["Paris Saint-Germain", "Ligue 1", "Nike", "https://www.footballkitarchive.com/nike-kits-2025-26-b726/"]
];

export const season2025KitArchive: KitArchiveRecord[] = clubRows.flatMap(([club, league, manufacturer, manufacturerSource]) =>
  (["Home", "Away", "Third", "Goalkeeper"] as const).map((kitType) => ({
    id: `${club.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-2025-26-${kitType.toLowerCase()}`,
    club,
    league,
    season: "2025/26" as const,
    kitType,
    manufacturer,
    manufacturerSource,
    shirtSponsor: null,
    frontImage: null,
    backImage: null,
    frontImageStatus: "pending" as const,
    backImageStatus: "pending" as const,
    imageRightsStatus: "not-cleared" as const
  }))
);
