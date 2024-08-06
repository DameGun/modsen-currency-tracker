import { ChangeEvent, useState } from 'react';
import cn from 'classnames';

import './styles.scss';
import { ArrowDown } from '@/assets/icons';

interface SelectProps {
  id: string;
  options: string[];
  selected: string;
  onChange: (selected: string) => void;
}

export default function Select({ id, options, onChange, selected }: SelectProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function handleSelect() {
    setIsOpen((currState) => !currState);
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    onChange(e.target.value);
    handleSelect();
  }

  return (
    <div className={cn('select', { active: isOpen })}>
      <button
        className='select__button'
        role='combobox'
        aria-label='select button'
        aria-haspopup='listbox'
        aria-expanded='false'
        aria-controls='select__dropdown'
        type='button'
        onClick={handleSelect}
      >
        <span className='select__selected'>{selected ? selected : 'Select'}</span>
        <ArrowDown className='select__selected__arrow' />
      </button>
      <ul className='select__dropdown' role='listbox' id='select__dropdown'>
        {options.map((option) => (
          <li className='select__dropdown__option' key={id + option} role='option'>
            <input
              type='radio'
              id={id + option}
              name={id + option}
              checked={option === selected}
              value={option}
              onChange={handleChange}
            />
            <label htmlFor={id + option}>{option}</label>
          </li>
        ))}
      </ul>
    </div>
  );
}
