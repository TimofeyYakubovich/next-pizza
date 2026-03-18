export const mapPizzaSize = {
  20: 'Маленькая',
  30: 'Средняя',
  40: 'Большая',
} as const;

export const mapPizzaType = {
  1: 'традиционная',
  2: 'тонкая',
} as const;

// создаем массив из этих вариантов для компанента GroupVariants
// Object.entries преобразует объект в массив пар [key, value], при этом ключи всегда становятся строками. Результат:
// [ ['20', 'Маленькая'], ['30', 'Средняя'], ['40', 'Большая'] ]
// .map() Для каждой пары создаётся новый объект вида { name, value }: name берётся из значения исходной пары (название размера). value берётся из ключа исходной пары 
// (размер, но уже как строка). Результат: [ { name: 'Маленькая', value: '20' }, { name: 'Средняя', value: '30' }, { name: 'Большая', value: '40' } ]

export const pizzaSizes = Object.entries(mapPizzaSize).map(([value, name]) => ({
  name,
  value,
}));

export const pizzaTypes = Object.entries(mapPizzaType).map(([value, name]) => ({
  name,
  value,
}));

export type PizzaSize = keyof typeof mapPizzaSize;
export type PizzaType = keyof typeof mapPizzaType;