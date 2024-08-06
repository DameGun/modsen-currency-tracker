import { useEffect, useState } from 'react';

import { DEBOUNCE_BASE_DELAY } from '@/constants/misc';

interface DebounceProps {
  value: string;
  delay?: number;
}

export default function useDebounce({ value, delay = DEBOUNCE_BASE_DELAY }: DebounceProps) {
  const [debouncedValue, setDebouncedValue] = useState<string>(value);

  useEffect(() => {
    const id = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(id);
    };
  }, [value, delay]);

  return debouncedValue;
}
