import React from "react";
import { motion } from "framer-motion";
import { type Bar } from "../types";

interface Props {
  array: Bar[];
}

export const Visualizer: React.FC<Props> = ({ array }: {array: Bar[]}) => {
  const maxValue = Math.max(...array.map(b => b.value), 1);

  return (
    <div className="flex items-end w-full h-full gap-[1px] px-1 bg-black/10 rounded-lg overflow-hidden">
      {array.map((bar) => (
        <motion.div
          key={bar.id}
          layout
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          style={{ height: `${(bar.value / maxValue) * 100}%` }}
          className={`flex-1 ${bar.color} rounded-t-[1px] min-w-[2px] transition-colors duration-200`}
        />
      ))}
    </div>
  );
};