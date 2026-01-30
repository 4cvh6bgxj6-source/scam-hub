
export type Language = 'en' | 'it';

export interface TradeItem {
  id: number;
  user: string;
  item: string;
  price: string;
  status: string;
}

export interface ScamReport {
  reporterName: string;
  discordUsername: string;
  scammerName: string; // Roblox Name
  scripterName?: string; // Optional: Name of the script/hack used
  scamDate: string;
  description: string;
  proofFile: File | null;
  isScripterReport?: boolean;
}

export enum ViewState {
  HOME = 'HOME',
  REPORT = 'REPORT',
  BLACKLIST = 'BLACKLIST',
  SUCCESS = 'SUCCESS'
}
