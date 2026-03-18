'use client';

import React from 'react';

import { FilterCheckbox, FilterChecboxProps } from './filter-checkbox';
import { Input } from '../ui/input';
import { Skeleton } from '../ui';

type Item = FilterChecboxProps;

interface Props {
  title: string;
  items: Item[]; // сами чекбоксы
  defaultItems?: Item[]; // чекбоксы которые будут отоброжаться поумолчанию при первом рендере 6 при нераскрытом списке
  limit?: number; // сколько чекбоксов показывать в ограниченном списке
  loading?: boolean;
  searchInputPlaceholder?: string; // для инпута поиск по чекбоксам
  className?: string;
  // onChange?: (values: string[]) => void; // какие чекбоксы выбрали
  onClicCheckbox?: (id: string) => void; // какие чекбоксы выбрали
  selected?: Set<string>
  defaultValue?: string[]; // при перезагрузки страницы будет сохронять какие чекбоксы выбрали
  name?: string;
}

export const CheckboxFiltersGroup: React.FC<Props> = ({
  title,
  items,
  defaultItems,
  limit = 5,
  loading,
  searchInputPlaceholder = 'Поиск...',
  className,
  // onChange,
  onClicCheckbox,
  selected,
  defaultValue,
  name
}) => {
  const [showAll, setShowAll] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('')

  // const onChangeSearchInput = (value: string) => {
  //   setSearchValue(value);
  // };

  const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  if (loading) {
    return (
      <div className={className}>
        <p className="font-bold mb-3">{title}</p>

        {...Array(limit)
          .fill(0)
          .map((_, index) => <Skeleton key={index} className="h-6 mb-4 rounded-[8px]" />)}

        <Skeleton className="w-28 h-6 mb-4 rounded-[8px]" />
      </div>
    );
  }

  const list = showAll 
    ? items.filter((item) => item.text.toLowerCase().includes(searchValue.toLocaleLowerCase()))
    : (defaultItems || items).slice(0, limit);

//   const onCheckedChange = (value: string) => {
//     toggle(value);
//   };

//   React.useEffect(() => {
//     if (defaultValue) {
//       defaultValue.forEach(add);
//     }
//   }, [defaultValue?.length]);

//   React.useEffect(() => {
//     onChange?.(Array.from(selected));
//   }, [selected]);

  return (
    <div className={className}>
      <p className="font-bold mb-3">{title}</p>

      {/* инпут дял поиска по чекбоксам */}
      {/* <Input placeholder={searchInputPlaceholder} className="bg-gray-50 border-none mb-5" /> */}
      {showAll && (
        <div className="mb-5">
          <Input 
            // onChange={e => onChangeSearchInput(e.target.value)}
            onChange={onChangeSearchInput}
            placeholder={searchInputPlaceholder} 
            className="bg-gray-50 border-none" 
          />
        </div>
      )}
        {/* отображение самих чекбоксов */}
      <div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
        {/* {(showAll ? items : defaultItems || items).map((item, index) => ( */}
        {list.map((item, index) => (
        // {items.map((item, index) => (
          <FilterCheckbox
            // onCheckedChange={() => onCheckedChange(item.value)}
            // onCheckedChange={(ibs) => console.log(ibs)}
            onCheckedChange={() => onClicCheckbox?.(item.value)} // добавляем id в сет тоесть передаем его в onAddId
            // checked={false}
            checked={selected?.has(item.value)} // при каждом клике на чекбокс будет проверять есть ли он в списке и подчвечивать его если вернется true
            // key={String(item.value)}
            key={index}
            value={item.value}
            text={item.text}
            endAdornment={item.endAdornment}
            name={name}
          />
        ))}
        {/* ))} */}
      </div>

      {items.length > limit && (
        <div className={showAll ? 'border-t border-t-neutral-100 mt-4' : ''}>
          <button onClick={() => setShowAll(!showAll)} className="text-primary mt-3">
            {showAll ? 'Скрыть' : '+ Показать все'}
          </button>
        </div>
      )}
    </div>
  );
};