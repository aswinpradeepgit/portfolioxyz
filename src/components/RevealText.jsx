import { motion } from "framer-motion";

// Word-by-word reveal: each word slides up from behind a mask.
export default function RevealText({ text, as = "span", inView = true, delay = 0, stagger = 0.06, className = "", ...rest }) {
  const Tag = motion[as];
  const words = text.split(" ");
  const trigger = inView
    ? { initial: "hidden", whileInView: "show", viewport: { once: true, margin: "-80px" } }
    : { initial: "hidden", animate: "show" };

  return (
    <Tag
      {...trigger}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
      className={className}
      {...rest}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.12em] align-top">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "105%", opacity: 0 },
              show: { y: "0%", opacity: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && " "}
        </span>
      ))}
    </Tag>
  );
}
