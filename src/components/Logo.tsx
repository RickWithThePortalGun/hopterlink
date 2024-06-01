import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const Logo = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // When mounted on client, now we can show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <img
      src={theme === 'dark' ? '/Hopterlink png 2.png' : '/Hopterlink png 3.png'}
      alt="Logo"
      className="mr-3 w-20"    />
  );
};

export default Logo;
