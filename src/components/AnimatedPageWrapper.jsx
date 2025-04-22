import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// const useIsMediumUp = () => {
//   const [isMediumUp, setIsMediumUp] = useState(false);

//   useEffect(() => {
//     const mediaQuery = window.matchMedia('(min-width: 768px)');
//     const handler = (e) => setIsMediumUp(e.matches);

//     setIsMediumUp(mediaQuery.matches); // 初始值
//     mediaQuery.addEventListener('change', handler);

//     return () => mediaQuery.removeEventListener('change', handler);
//   }, []);

//   return isMediumUp;
// };

// const isMediumUp = useIsMediumUp();

const pageVariants = {
  initial: {
    scale: 0.9,
    opacity: 0,
    height: "0%",
  },
  in: {
    scale: 1,
    opacity: 1,
    height: "100%",
    position: "fixed",
    top: "0",
  },
  out: {
    scale: 0.9,
    opacity: 0,
    height: "0%",
  },
};

const pageTransition = {
  duration: 0.4,
  ease: "easeInOut",
};

const AnimatedPageWrapper = ({ children }) => {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      style={{ position: 'absolute', width: '100%' }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedPageWrapper;
