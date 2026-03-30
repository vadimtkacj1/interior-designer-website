/** Shared Framer Motion presets */
export const viewportOptions = {
  margin: '0px 0px -80px 0px',
  amount: 0.2,
};

export const fadeInUpFast = {
  initial: { opacity: 0, y: 15 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay: 0.1 },
};
