export interface DesignState {
  baseColor: string;
  motif: string;
  technique: string;
  shape: string;
  decoration: string;
  additionalPrompt: string;
}

export interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  timestamp: number;
}

export enum LacquerColor {
  Black = 'Black Lacquer (黑漆)',
  Red = 'Vermilion (朱漆)',
  Green = 'Dark Green (绿沉)',
  Brown = 'Amber (褐漆)'
}

export enum Motif {
  Orchid = 'Orchid (兰花)',
  PlumBlossom = 'Plum Blossom (梅花)',
  Bamboo = 'Bamboo (竹)',
  Chrysanthemum = 'Chrysanthemum (菊花)',
  Pine = 'Pine (松)',
  Crane = 'Crane (鹤)'
}

export enum Decoration {
  GoldLines = 'Gold Maki-e Lines (金描)',
  MotherOfPearl = 'Mother-of-pearl Inlay (螺钿)',
  SilverDust = 'Silver Dust (银粉)',
  Carved = 'Carved Lacquer (剔红)'
}