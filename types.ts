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
  discordUsername: string; // Added field
  scammerName: string;
  scamDate: string;
  description: string;
  proofFile: File | null;
}

export enum ViewState {
  HOME = 'HOME',
  REPORT = 'REPORT',
  SUCCESS = 'SUCCESS'
}