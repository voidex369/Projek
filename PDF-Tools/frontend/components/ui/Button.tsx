import React from 'react'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  href?: string
  download?: boolean
  children: React.ReactNode
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'md', isLoading, children, disabled, href, download, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed'

    const variants = {
      default: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
      primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500',
      secondary: 'bg-primary-100 text-primary-700 hover:bg-primary-200',
      outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50',
      ghost: 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
      destructive: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    }

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    }

    const combinedClassName = cn(baseStyles, variants[variant], sizes[size], className)

    // Render as <a> if href is provided
    if (href) {
      const anchorProps: React.AnchorHTMLAttributes<HTMLAnchorElement> = {
        ...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>),
        href,
      }
      if (download) {
        anchorProps.download = ''
      }
      return (
        <a
          className={combinedClassName}
          {...anchorProps}
        >
          {isLoading && (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          )}
          {children}
        </a>
      )
    }

    return (
      <button
        ref={ref}
        className={combinedClassName}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        )}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
