import { useEffect, useState } from 'react';

export function useDebounceFunction<T>(func: (arg: T) => void, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState<T | null>(null);

  useEffect(() => {
    if (debouncedValue !== null) {
      const handler = setTimeout(() => {
        func(debouncedValue);
      }, delay);

      return () => clearTimeout(handler);
    }
  }, [debouncedValue, delay, func]);

  return setDebouncedValue;
}
