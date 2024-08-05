import { ChangeEvent, useState } from 'react';
import cn from 'classnames';

import './styles.scss';
import { ArrowDown } from '@/assets/icons';

interface SelectProps {
  label: string;
  options: string[];
  selected: string;
  onChange: (selected: string) => void;
}

export default function Select({ label, options, onChange, selected }: SelectProps) {
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
      <h4 className='select__label'>{label}</h4>
      <button
        className='select__button'
        role='combobox'
        aria-label='select button'
        aria-haspopup='listbox'
        aria-expanded='false'
        aria-controls='select__dropdown'
        onClick={handleSelect}
      >
        <span className='select__selected'>{selected ? selected : 'Select'}</span>
        <ArrowDown className='select__selected__arrow' />
      </button>
      <ul className='select__dropdown' role='listbox' id='select__dropdown'>
        {options.map((option) => (
          <li className='select__dropdown__option' key={label + option} role='option'>
            <input
              type='radio'
              id={label + option}
              name={label + option}
              checked={option === selected}
              value={option}
              onChange={handleChange}
            />
            <label htmlFor={label + option}>{option}</label>
          </li>
        ))}
      </ul>
    </div>
  );
}
