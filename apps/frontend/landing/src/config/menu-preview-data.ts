export type MenuThumbItem = {
  key: string;
  image: string;
};

export const menuPreviewImages = {
  drinks: {
    cold: [
      {
        key: 'yuzuSoda',
        image:
          'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=200&q=80',
      },
      {
        key: 'matchaLemonade',
        image:
          'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=200&q=80',
      },
    ] satisfies MenuThumbItem[],
    hot: [
      {
        key: 'hojicha',
        image:
          'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=200&q=80',
      },
      {
        key: 'sencha',
        image:
          'https://images.unsplash.com/photo-1564890369479-c4ae22577287?auto=format&fit=crop&w=200&q=80',
      },
    ] satisfies MenuThumbItem[],
  },
  snacks: [
    {
      key: 'edamame',
      image:
        'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=200&q=80',
    },
    {
      key: 'riceCrackers',
      image:
        'https://images.unsplash.com/photo-1599490659213-e2b95cba05bc?auto=format&fit=crop&w=200&q=80',
    },
    {
      key: 'misoNuts',
      image:
        'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?auto=format&fit=crop&w=200&q=80',
    },
  ] satisfies MenuThumbItem[],
  appetizer: [
    {
      key: 'tunaTartare',
      image:
        'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&w=200&q=80',
    },
    {
      key: 'cucumberSalad',
      image:
        'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=200&q=80',
    },
    {
      key: 'agedashi',
      image:
        'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=200&q=80',
    },
  ] satisfies MenuThumbItem[],
  mainMeal: {
    breakfast: [
      {
        key: 'tamagoBowl',
        image:
          'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=200&q=80',
      },
    ] satisfies MenuThumbItem[],
    salad: [
      {
        key: 'misoSalmon',
        image:
          'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=200&q=80',
      },
    ] satisfies MenuThumbItem[],
    pasta: [
      {
        key: 'uniPasta',
        image:
          'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=200&q=80',
      },
    ] satisfies MenuThumbItem[],
    pizza: [
      {
        key: 'trufflePizza',
        image:
          'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=200&q=80',
      },
    ] satisfies MenuThumbItem[],
  },
  desserts: {
    frozen: [
      {
        key: 'matchaSoftServe',
        image:
          'https://images.unsplash.com/photo-1563805042-7684c019e1cd?auto=format&fit=crop&w=200&q=80',
      },
      {
        key: 'yuzuSorbet',
        image:
          'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=200&q=80',
      },
    ] satisfies MenuThumbItem[],
    baked: [
      {
        key: 'misoBrownie',
        image:
          'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=200&q=80',
      },
      {
        key: 'blackSesameCake',
        image:
          'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=200&q=80',
      },
    ] satisfies MenuThumbItem[],
  },
} as const;
