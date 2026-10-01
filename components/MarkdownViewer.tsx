import React, { useState } from 'react';
import { Copy, Check, Terminal, ExternalLink, Hash, BookOpen } from 'lucide-react';

interface MarkdownViewerProps {
  content: string;
}

export const MarkdownViewer: React.FC<MarkdownViewerProps> = ({ content }) => {
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  // Parse lines into tokens
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];

  let inCodeBlock = false;
  let codeBlockLang = '';
  let codeBlockLines: string[] = [];
  let codeBlockIndex = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Code fence start/end
    if (line.trim().startsWith('```')) {
      if (inCodeBlock) {
        // End of code block
        const codeText = codeBlockLines.join('\n');
        const blockId = `code-block-${codeBlockIndex++}`;
        elements.push(
          <div key={blockId} className="my-4 rounded-xl overflow-hidden border border-slate-700/80 bg-[#0d1117] text-slate-200 font-mono text-xs shadow-md">
            <div className="flex items-center justify-between px-4 py-2 bg-slate-800/80 border-b border-slate-700/60 text-[11px] text-slate-400">
              <span className="flex items-center gap-1.5 uppercase font-semibold text-purple-400">
                <Terminal size={13} />
                {codeBlockLang || 'text'}
              </span>
              <button
                onClick={() => copyToClipboard(codeText, blockId)}
                className="flex items-center gap-1 hover:text-white transition-colors"
                title="Copy code"
              >
                {copiedCodeId === blockId ? (
                  <>
                    <Check size={12} className="text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={12} />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <pre className="p-4 overflow-x-auto text-[12px] leading-relaxed font-mono">
              <code>{codeText}</code>
            </pre>
          </div>
        );
        inCodeBlock = false;
        codeBlockLines = [];
        codeBlockLang = '';
      } else {
        // Start of code block
        inCodeBlock = true;
        codeBlockLang = line.trim().replace(/^```/, '').trim();
        codeBlockLines = [];
      }
      continue;
    }

    if (inCodeBlock) {
      codeBlockLines.push(line);
      continue;
    }

    // Empty lines
    if (!line.trim()) {
      continue;
    }

    // Headings
    if (line.startsWith('# ')) {
      const headingText = line.replace('# ', '').trim();
      elements.push(
        <div key={`h1-${i}`} className="mt-2 mb-4 pb-3 border-b border-slate-200/80 dark:border-slate-800">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <BookOpen size={24} className="text-purple-600 dark:text-purple-400 shrink-0" />
            <span>{headingText}</span>
          </h1>
        </div>
      );
      continue;
    }

    if (line.startsWith('## ')) {
      const headingText = line.replace('## ', '').trim();
      elements.push(
        <div key={`h2-${i}`} className="mt-8 mb-3 pt-4 border-t border-slate-200/60 dark:border-slate-800/80">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <Hash size={18} className="text-purple-600 dark:text-purple-400 shrink-0" />
            <span>{headingText}</span>
          </h2>
        </div>
      );
      continue;
    }

    if (line.startsWith('### ')) {
      const headingText = line.replace('### ', '').trim();
      elements.push(
        <h3 key={`h3-${i}`} className="mt-4 mb-2 text-sm sm:text-base font-bold text-purple-700 dark:text-purple-300">
          {headingText}
        </h3>
      );
      continue;
    }

    // Bullet lists
    if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
      const itemText = line.trim().replace(/^[-*]\s+/, '');
      elements.push(
        <div key={`li-${i}`} className="flex items-start gap-2.5 my-1.5 ml-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 shrink-0"></span>
          <span className="leading-relaxed">{renderInlineMarkdown(itemText)}</span>
        </div>
      );
      continue;
    }

    // Blockquote
    if (line.trim().startsWith('> ')) {
      const quoteText = line.trim().replace(/^>\s+/, '');
      elements.push(
        <blockquote key={`quote-${i}`} className="my-3 pl-4 border-l-3 border-purple-500 italic text-xs sm:text-sm text-slate-600 dark:text-slate-400 bg-purple-50/50 dark:bg-purple-950/20 py-2 rounded-r-lg">
          {renderInlineMarkdown(quoteText)}
        </blockquote>
      );
      continue;
    }

    // Standard Paragraph
    elements.push(
      <p key={`p-${i}`} className="my-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
        {renderInlineMarkdown(line)}
      </p>
    );
  }

  return <div className="markdown-body space-y-1">{elements}</div>;
};

// Helper to render bold and inline code
function renderInlineMarkdown(text: string): React.ReactNode {
  // Split by inline code `code`
  const codeParts = text.split(/(`[^`]+`)/g);

  return (
    <>
      {codeParts.map((part, idx) => {
        if (part.startsWith('`') && part.endsWith('`')) {
          const codeSnippet = part.slice(1, -1);
          return (
            <code
              key={idx}
              className="px-1.5 py-0.5 mx-0.5 rounded text-[11px] font-mono bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 border border-purple-200/60 dark:border-purple-900/60 font-medium"
            >
              {codeSnippet}
            </code>
          );
        }

        // Bold text **text**
        const boldParts = part.split(/(\*\*[^*]+\*\*)/g);
        return (
          <React.Fragment key={idx}>
            {boldParts.map((bPart, bIdx) => {
              if (bPart.startsWith('**') && bPart.endsWith('**')) {
                return (
                  <strong key={bIdx} className="font-bold text-slate-900 dark:text-white">
                    {bPart.slice(2, -2)}
                  </strong>
                );
              }
              return bPart;
            })}
          </React.Fragment>
        );
      })}
    </>
  );
}
