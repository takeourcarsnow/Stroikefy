'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { getInitials } from '@/lib/utils';

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  status?: 'online' | 'offline' | 'busy' | 'away';
}

export const Avatar: React.FC<AvatarProps> = ({
  className,
  src,
  name,
  size = 'md',
  status,
  ...props
}) => {
  const sizes = {
    xs: 'h-6 w-6 text-xs',
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base',
    xl: 'h-16 w-16 text-lg',
  };
  
  const statusSizes = {
    xs: 'h-1.5 w-1.5',
    sm: 'h-2 w-2',
    md: 'h-2.5 w-2.5',
    lg: 'h-3 w-3',
    xl: 'h-4 w-4',
  };
  
  const statusColors = {
    online: 'bg-green-500',
    offline: 'bg-surface-400',
    busy: 'bg-red-500',
    away: 'bg-yellow-500',
  };

  return (
    <div className={cn('relative inline-flex', className)} {...props}>
      {src ? (
        <img
          src={src}
          alt={name}
          className={cn(
            'rounded-full object-cover bg-surface-200 dark:bg-surface-700',
            sizes[size]
          )}
        />
      ) : (
        <div
          className={cn(
            'rounded-full flex items-center justify-center font-medium',
            'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300',
            sizes[size]
          )}
        >
          {getInitials(name)}
        </div>
      )}
      {status && (
        <span
          className={cn(
            'absolute bottom-0 right-0 rounded-full ring-2 ring-white dark:ring-surface-800',
            statusSizes[size],
            statusColors[status]
          )}
        />
      )}
    </div>
  );
};

// Avatar Group
interface AvatarGroupProps {
  avatars: { src?: string; name: string }[];
  max?: number;
  size?: 'xs' | 'sm' | 'md' | 'lg';
}

export const AvatarGroup: React.FC<AvatarGroupProps> = ({
  avatars,
  max = 4,
  size = 'md',
}) => {
  const displayAvatars = avatars.slice(0, max);
  const remaining = avatars.length - max;
  
  const sizes = {
    xs: 'h-6 w-6 text-xs -ml-1.5',
    sm: 'h-8 w-8 text-xs -ml-2',
    md: 'h-10 w-10 text-sm -ml-3',
    lg: 'h-12 w-12 text-base -ml-4',
  };

  return (
    <div className="flex items-center">
      {displayAvatars.map((avatar, index) => (
        <div
          key={index}
          className={cn(
            'ring-2 ring-white dark:ring-surface-800 rounded-full',
            index > 0 && sizes[size].split(' ').pop()
          )}
        >
          <Avatar src={avatar.src} name={avatar.name} size={size} />
        </div>
      ))}
      {remaining > 0 && (
        <div
          className={cn(
            'flex items-center justify-center rounded-full font-medium',
            'bg-surface-100 text-surface-600 dark:bg-surface-700 dark:text-surface-300',
            'ring-2 ring-white dark:ring-surface-800',
            sizes[size]
          )}
        >
          +{remaining}
        </div>
      )}
    </div>
  );
};
