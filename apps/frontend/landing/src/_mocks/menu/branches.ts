export type MenuBranch = {
  id: string;
  name: string;
  address: string;
};

export const mockMenuBranches: MenuBranch[] = [
  {
    id: 'shibuya',
    name: 'SHINSEI Shibuya',
    address: '2-21-1 Shibuya, Tokyo',
  },
  {
    id: 'omotesando',
    name: 'SHINSEI Omotesando',
    address: '5-9-11 Jingumae, Tokyo',
  },
  {
    id: 'nakameguro',
    name: 'SHINSEI Nakameguro',
    address: '1-8-3 Kamimeguro, Tokyo',
  },
];
