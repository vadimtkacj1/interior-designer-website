import React from 'react';
import { useParallaxOffset } from '../../hooks/useParallaxOffset';

/**
 * Scroll parallax: vertical (speed) and optional horizontal drift (speedX).
 */
export default function Parallax({
  children,
  speed = 0.12,
  speedX = 0,
  className = '',
  as: Tag = 'div',
  style: extraStyle,
  ...rest
}) {
  const { ref, style } = useParallaxOffset(speed, speedX);
  return React.createElement(Tag, { ref, className, style: { ...style, ...extraStyle }, ...rest }, children);
}
