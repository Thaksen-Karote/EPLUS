"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import "./AnimatedList.css";

interface AnimatedListProps {
  items: string[] | React.ReactNode[];
  onItemSelect?: (item: string | React.ReactNode, index: number) => void;
  showGradients?: boolean;
  enableArrowNavigation?: boolean;
  className?: string;
  itemClassName?: string;
  displayScrollbar?: boolean;
  initialSelectedIndex?: number;
}

const AnimatedItem = ({
  children,
  index,
  onMouseEnter,
  onClick,
}: any) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false });

  return (
    <motion.div
      ref={ref}
      data-index={index}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: 1 } : {}}
      transition={{ duration: 0.25 }}
      className="mb-3 cursor-pointer"
    >
      {children}
    </motion.div>
  );
};

export default function AnimatedList({
  items,
  onItemSelect,
  showGradients = true,
  enableArrowNavigation = true,
  className = "",
  itemClassName = "",
  displayScrollbar = true,
  initialSelectedIndex = -1,
}: AnimatedListProps) {
  const listRef = useRef<HTMLDivElement | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(initialSelectedIndex);

  const handleItemMouseEnter = (index: number) => {
    setSelectedIndex(index);
  };

  const handleItemClick = (item: string | React.ReactNode, index: number) => {
    setSelectedIndex(index);
    onItemSelect?.(item, index);
  };

  useEffect(() => {
    if (!enableArrowNavigation) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, items.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [items, enableArrowNavigation]);

  return (
    <div className={`relative ${className}`}>
      <div
        ref={listRef}
        className={`flex flex-col gap-6 ${
  !displayScrollbar ? "no-scrollbar" : ""
}`}
      >
        {items.map((item, index) => (
          <AnimatedItem
            key={`${item}-${index}`}
            index={index}
            onMouseEnter={() => handleItemMouseEnter(index)}
            onClick={() => handleItemClick(item, index)}
          >
            <div className={itemClassName}>
  {item}
</div>
          </AnimatedItem>
        ))}
      </div>
    </div>
  );
}