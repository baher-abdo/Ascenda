import { motion } from "framer-motion";
import React from "react";

const sectionVariants = {
  hidden: { opacity: 0, transition: { duration: 0.4 } },
  visible: { opacity: 1, transition: { duration: 0.4 } },
};

export default function MotionEffect({ children }: { children: React.ReactNode }) {
  return (
    <motion.div key="motion-effect" variants={sectionVariants} initial="hidden" animate="visible">
      {children}
    </motion.div>
  );
}
