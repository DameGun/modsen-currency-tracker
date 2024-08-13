import { type ChangeEvent, useEffect, useState } from 'react';

import './styles.scss';
import { Input, Select } from '@/components/ui';
import { useAppSelector } from '@/hooks/redux';
import useDebounce from '@/hooks/useDebounce';
import { selectCurrenciesCodes } from '@/store/currencies';
import { blockInvalidCharacter } from '@/utils/converter';

interface ConverterProps {
  targetCurrency: string;
}

export default function Converter({ targetCurrency }: ConverterProps) {
  const currenciesCodes = useAppSelector(selectCurrenciesCodes);

  const [fromSelectValue, setFromSelectValue] = useState<string>(targetCurrency);
  const [toSelectValue, setToSelectValue] = useState<string>('');

  const [inputBaseValue, setInputBaseValue] = useState<string>('1');
  const [inputConvertValue, setInputConvertValue] = useState<string>('');
  const debouncedBaseValue = useDebounce({ value: inputBaseValue });

  function handleFromSelectChange(value: string) {
    setFromSelectValue(value);
  }

  function handleToSelectChange(value: string) {
    setToSelectValue(value);
  }

  function handleBaseValueChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;

    if (!Number.isNaN(value) || value === '') {
      setInputBaseValue(value);
    }
  }

  function convertCurrency(baseValue: number) {
    let convertedValue: number = 0;
    const convertValueRateToUSD: number = currenciesCodes[toSelectValue];

    if (fromSelectValue === 'USD') {
      convertedValue = baseValue / convertValueRateToUSD;
    } else {
      const baseValueRateToUSD: number = currenciesCodes[fromSelectValue];
      convertedValue = (baseValue / baseValueRateToUSD) * convertValueRateToUSD;
    }

    if (convertedValue > Number.MAX_SAFE_INTEGER) {
      setInputConvertValue(convertedValue.toExponential(10));
    } else {
      setInputConvertValue(
        new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(convertedValue)
      );
    }
  }

  useEffect(() => {
    if (debouncedBaseValue && toSelectValue) {
      convertCurrency(Number(debouncedBaseValue));
    }
  }, [debouncedBaseValue, fromSelectValue, toSelectValue]);

  return (
    <div className='converter' data-testid='converter'>
      <div className='converter__section'>
        <label className='converter__label'>From</label>
        <div className='converter__row'>
          <Select
            id='from-select'
            options={Object.keys(currenciesCodes)}
            onChange={handleFromSelectChange}
            selected={fromSelectValue}
          />
          <Input
            id='from'
            name='from'
            type='number'
            value={inputBaseValue}
            onChange={handleBaseValueChange}
            onKeyDown={blockInvalidCharacter}
            min={0}
          />
        </div>
      </div>
      <div className='converter__section'>
        <label className='converter__label'>To</label>
        <div className='converter__row'>
          <Select
            id='to-select'
            options={Object.keys(currenciesCodes)}
            onChange={handleToSelectChange}
            selected={toSelectValue}
          />
          <Input id='to' name='to' readOnly type='text' value={inputConvertValue} />
        </div>
      </div>
    </div>
  );
}
