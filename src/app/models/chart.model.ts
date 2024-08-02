export interface Chart {
    id: number;
    name: string;
    type: string;
    color: string;
    data: { date: string, value: number }[];
  }
  