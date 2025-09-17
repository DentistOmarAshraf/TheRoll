
export interface ISubFieldDAO {
  name: string;
  type: string;
  label: string;
  option?: string[];
}

export interface IFieldDAO {
  name: string;
  legend: string;
  repet: boolean;
  sub: ISubFieldDAO[];
}