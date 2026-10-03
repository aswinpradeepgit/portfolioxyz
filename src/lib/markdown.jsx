import { Fragment } from "react";

// Tiny Markdown renderer for blog posts. Supports:
//   ## / ### headings, paragraphs, - and 1. lists, > quotes, --- rules,
//   ```code blocks```, ![alt](src "caption") figures,
//   and inline **bold**, *italic*, `code`, [links](url).

const INLINE = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;

function inline(text, keyBase = "") {
  return text.split(INLINE).map((part, i) => {
    const key = `${keyBase}-${i}`;
    if (/^\*\*[^*]+\*\*$/.test(part)) return <strong key={key}>{part.slice(2, -2)}</strong>;
    if (/^\*[^*]+\*$/.test(part)) return <em key={key}>{part.slice(1, -1)}</em>;
    if (/^`[^`]+`$/.test(part)) return <code key={key}>{part.slice(1, -1)}</code>;
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      const external = /^https?:/.test(link[2]);
      return (
        <a key={key} href={link[2]} {...(external && { target: "_blank", rel: "noopener noreferrer" })}>
          {link[1]}
        </a>
      );
    }
    return <Fragment key={key}>{part}</Fragment>;
  });
}

function parseBlocks(md) {
  const lines = md.replace(/\r/g, "").split("\n");
  const blocks = [];
  let para = [];
  const flush = () => {
    if (para.length) blocks.push({ type: "p", text: para.join(" ") });
    para = [];
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const t = line.trim();
    if (!t) { flush(); continue; }

    if (t.startsWith("```")) {
      flush();
      const code = [];
      for (i++; i < lines.length && !lines[i].trim().startsWith("```"); i++) code.push(lines[i]);
      blocks.push({ type: "code", text: code.join("\n") });
      continue;
    }
    const h = t.match(/^(#{1,3})\s+(.*)$/);
    if (h) { flush(); blocks.push({ type: `h${Math.max(2, h[1].length)}`, text: h[2] }); continue; }
    if (/^---+$/.test(t)) { flush(); blocks.push({ type: "hr" }); continue; }
    const img = t.match(/^!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)$/);
    if (img) { flush(); blocks.push({ type: "img", alt: img[1], src: img[2], caption: img[3] }); continue; }
    if (t.startsWith(">")) {
      flush();
      const q = [t.replace(/^>\s?/, "")];
      while (lines[i + 1]?.trim().startsWith(">")) q.push(lines[++i].trim().replace(/^>\s?/, ""));
      blocks.push({ type: "quote", text: q.join(" ") });
      continue;
    }
    const li = t.match(/^(-|\d+\.)\s+(.*)$/);
    if (li) {
      flush();
      const ordered = li[1] !== "-";
      const items = [li[2]];
      while (lines[i + 1]?.trim().match(ordered ? /^\d+\.\s+/ : /^-\s+/)) items.push(lines[++i].trim().replace(/^(-|\d+\.)\s+/, ""));
      blocks.push({ type: ordered ? "ol" : "ul", items });
      continue;
    }
    para.push(t);
  }
  flush();
  return blocks;
}

export function Markdown({ source }) {
  return parseBlocks(source).map((b, i) => {
    const k = `b${i}`;
    switch (b.type) {
      case "h2": return <h2 key={k}>{inline(b.text, k)}</h2>;
      case "h3": return <h3 key={k}>{inline(b.text, k)}</h3>;
      case "hr": return <hr key={k} />;
      case "code": return <pre key={k}><code>{b.text}</code></pre>;
      case "quote": return <blockquote key={k}>{inline(b.text, k)}</blockquote>;
      case "ul": return <ul key={k}>{b.items.map((it, j) => <li key={j}>{inline(it, `${k}-${j}`)}</li>)}</ul>;
      case "ol": return <ol key={k}>{b.items.map((it, j) => <li key={j}>{inline(it, `${k}-${j}`)}</li>)}</ol>;
      case "img":
        return (
          <figure key={k}>
            <img src={b.src} alt={b.alt} loading="lazy" />
            {b.caption && <figcaption>{b.caption}</figcaption>}
          </figure>
        );
      default: return <p key={k}>{inline(b.text, k)}</p>;
    }
  });
}
