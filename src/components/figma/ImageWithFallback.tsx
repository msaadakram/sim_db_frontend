'use client';
/* eslint-disable @next/next/no-img-element */

import React, { useState } from 'react'
import Image from 'next/image'
import { withSeoAlt } from '@/lib/seo-keywords'

const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg=='

const DEFAULT_WIDTH = 1200
const DEFAULT_HEIGHT = 675
const DEFAULT_SIZES = '(max-width: 640px) 100vw, (max-width: 1024px) 80vw, (max-width: 1536px) 50vw, 33vw'

type ImageWithFallbackProps = Omit<React.ComponentProps<typeof Image>, 'src' | 'alt' | 'width' | 'height'> & {
  src?: string
  alt?: string
  width?: number
  height?: number
}

export function ImageWithFallback(props: ImageWithFallbackProps) {
  const [didError, setDidError] = useState(false)

  const handleError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setDidError(true)
    props.onError?.(event)
  }

  const {
    src,
    alt,
    style,
    className,
    width = DEFAULT_WIDTH,
    height = DEFAULT_HEIGHT,
    sizes = DEFAULT_SIZES,
    quality = 65,
    priority,
    loading,
    decoding = 'async',
    ...rest
  } = props
  const resolvedAlt = withSeoAlt(String(alt || 'sim owner detail image'))

  const isMissingSource = !src || String(src).trim() === ''
  const isFallbackState = didError || isMissingSource

  if (isFallbackState) {
    return (
      <img
        src={ERROR_IMG_SRC}
        alt={withSeoAlt('Error loading image')}
        width={width}
        height={height}
        className={className}
        style={style}
        loading={priority ? 'eager' : loading ?? 'lazy'}
        decoding={decoding}
        data-original-url={src}
      />
    )
  }

  return (
    <Image
      src={src}
      alt={resolvedAlt}
      width={width}
      height={height}
      sizes={sizes}
      quality={quality}
      priority={priority}
      loading={priority ? undefined : loading ?? 'lazy'}
      decoding={decoding}
      className={className}
      style={style}
      onError={handleError}
      {...rest}
    />
  )
}
