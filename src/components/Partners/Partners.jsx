import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import InfiniteMarquee from '../ui/InfiniteMarquee';
import { viewportOptions } from '../../lib/animations';
import { partnerLogos } from '../../assets/partners/partnerAssets';

export default function Partners() {
  const dataArray = useMemo(() => partnerLogos, []);

  return (
    <section
      className="relative overflow-hidden bg-beige-light py-4"
      aria-label="שותפים"
    >
      <motion.div
        key="partners-marquee"
        className="relative w-full"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ ...viewportOptions, once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <InfiniteMarquee
          dataType="image"
          dataArray={dataArray}
          speed={35}
          direction="left"
          preserveColors
        />
      </motion.div>
    </section>
  );
}
