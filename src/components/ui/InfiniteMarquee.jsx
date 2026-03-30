import { useMemo, memo } from 'react';
import { motion } from 'framer-motion';
import { usePerformanceSettings } from '../../lib/usePerformanceSettings';

function InfiniteMarquee({
  dataArray,
  dataType = 'image',
  speed = 40,
  direction = 'left',
  className = '',
  preserveColors = false,
}) {
  const duplicatedData = useMemo(
    () => [...dataArray, ...dataArray, ...dataArray],
    [dataArray],
  );
  const { isMobile } = usePerformanceSettings();
  const duration = isMobile ? speed * 1.5 : speed;

  return (
    <div
      className={`relative w-full overflow-hidden py-2 ${className}`}
      style={{
        direction: 'ltr',
      }}
    >
      <motion.div
        className="flex w-max items-center gap-8 md:gap-20"
        initial={{ x: direction === 'left' ? 0 : '-33.33%' }}
        animate={{ x: direction === 'left' ? '-33.33%' : 0 }}
        transition={{
          duration,
          ease: 'linear',
          repeat: Infinity,
        }}
        whileHover={{ animationPlayState: 'paused' }}
      >
        {duplicatedData.map((item, index) => (
          <div
            key={index}
            className="flex shrink-0 items-center justify-center"
          >
            {dataType === 'image' ? (
              <img
                src={typeof item === 'string' ? item : item.src}
                alt={typeof item === 'string' ? '' : item.alt || ''}
                width={typeof item !== 'string' ? item.width : undefined}
                height={typeof item !== 'string' ? item.height : undefined}
                className={`h-20 w-auto object-contain transition-all duration-500 md:h-32
                  ${preserveColors ? 'opacity-100 grayscale-0' : 'opacity-60 grayscale hover:scale-110 hover:opacity-100 hover:grayscale-0'}
                  active:scale-110`}
                loading="eager"
                draggable={false}
              />
            ) : (
              <p className="whitespace-nowrap rounded-full border border-white/20 bg-[#141414] px-6 py-3 font-semibold text-white md:text-lg">
                {typeof item === 'string' ? item : ''}
              </p>
            )}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default memo(InfiniteMarquee);
