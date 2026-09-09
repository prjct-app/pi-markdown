import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

const FENCE = "```";
const LANGUAGE_HINTS = new Set([
	"bash",
	"console",
	"css",
	"diff",
	"html",
	"javascript",
	"js",
	"json",
	"jsx",
	"markdown",
	"md",
	"python",
	"py",
	"shell",
	"sh",
	"sql",
	"text",
	"toml",
	"tsx",
	"typescript",
	"ts",
	"xml",
	"yaml",
	"yml",
	"zsh",
]);

/** Convert one-line fenced snippets into standard Markdown blocks. */
export function normalizeOneLineFences(markdown: string): string {
	if (!markdown.includes(FENCE)) return markdown;

	let openFence: { marker: string; length: number } | undefined;
	return markdown
		.split("\n")
		.map((line) => {
			const fence = /^ {0,3}(`{3,}|~{3,})(.*)$/.exec(line);
			if (openFence) {
				if (fence && fence[1][0] === openFence.marker && fence[1].length >= openFence.length && !fence[2].trim()) openFence = undefined;
				return line;
			}
			const match = /^( {0,3})```([^`].*?)```\s*$/.exec(line);
			if (!match) {
				if (fence) openFence = { marker: fence[1][0], length: fence[1].length };
				return line;
			}

			const indent = match[1] ?? "";
			const body = (match[2] ?? "").trim();
			if (!body) return line;

			const separator = body.search(/\s/);
			const firstToken = separator === -1 ? body : body.slice(0, separator);
			const hasLanguage = !/^\s/.test(match[2]) && separator !== -1 && LANGUAGE_HINTS.has(firstToken.toLowerCase());
			const language = hasLanguage ? firstToken : "";
			const code = hasLanguage ? body.slice(separator).trimStart() : body;

			return `${indent}${FENCE}${language}\n${indent}${code}\n${indent}${FENCE}`;
		})
		.join("\n");
}

export default function compactMarkdown(pi: ExtensionAPI) {
	pi.registerMarkdownTransformer((markdown, { messageType, isStreaming }) => {
		if (messageType !== "assistant" || isStreaming) return markdown;
		return normalizeOneLineFences(markdown);
	});
}
