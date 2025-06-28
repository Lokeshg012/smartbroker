
import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';

const DarkModeToggle: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleDarkMode}
      className="relative w-8 h-8 rounded-full transition-colors duration-300 hover:bg-gray-100 dark:hover:bg-gray-800"
      aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <div className="relative w-5 h-5">
        <Sun 
          className={`absolute inset-0 h-5 w-5 text-gray-600 dark:text-gray-400 transition-all duration-300 ${
            isDarkMode ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'
          }`} 
        />
        <Moon 
          className={`absolute inset-0 h-5 w-5 text-gray-600 dark:text-gray-400 transition-all duration-300 ${
            isDarkMode ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
          }`} 
        />
      </div>
    </Button>
  );
};

export default DarkModeToggle;
