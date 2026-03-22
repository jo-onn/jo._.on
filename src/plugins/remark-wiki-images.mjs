import { visit } from "unist-util-visit";

/**
 * Remark plugin to transform Obsidian-style wiki image links
 * ![[filename.ext]] → standard markdown image node
 */
export function remarkWikiImages() {
  return (tree) => {
    visit(tree, "paragraph", (node) => {
      node.children = node.children.flatMap((child) => {
        if (child.type !== "text") return [child];

        const wikiImageRegex = /!\[\[([^\]]+)\]\]/g;
        const parts = [];
        let lastIndex = 0;
        let match;

        while ((match = wikiImageRegex.exec(child.value)) !== null) {
          if (match.index > lastIndex) {
            parts.push({ type: "text", value: child.value.slice(lastIndex, match.index) });
          }

          const filename = match[1].trim();
          parts.push({
            type: "image",
            url: `./media/${filename}`,
            alt: filename,
            title: null,
          });

          lastIndex = match.index + match[0].length;
        }

        if (lastIndex < child.value.length) {
          parts.push({ type: "text", value: child.value.slice(lastIndex) });
        }

        return parts.length > 0 ? parts : [child];
      });
    });
  };
}
