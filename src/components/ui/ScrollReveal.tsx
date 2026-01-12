import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface ScrollRevealProps {
    children: React.ReactNode;
    width?: "fit-content" | "100%";
    delay?: number;
    className?: string;
    direction?: "up" | "down" | "left" | "right";
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
    children,
    width = "fit-content",
    delay = 0,
    className = "",
    direction = "up"
}) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px 0px" });

    const getDirectionOffset = () => {
        switch (direction) {
            case "up": return { y: 30, x: 0 };
            case "down": return { y: -30, x: 0 };
            case "left": return { x: 30, y: 0 };
            case "right": return { x: -30, y: 0 };
            default: return { y: 30, x: 0 };
        }
    };

    const offset = getDirectionOffset();

    return (
        <div ref={ref} style={{ width, position: 'relative', overflow: 'hidden' }} className={className}>
            <motion.div
                variants={{
                    hidden: { opacity: 0, ...offset },
                    visible: { opacity: 1, x: 0, y: 0 },
                }}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                transition={{ duration: 0.6, delay, ease: "easeOut" }}
            >
                {children}
            </motion.div>
        </div>
    );
};

export default ScrollReveal;
