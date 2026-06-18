import MarkdownIt from 'markdown-it'
import { createHighlighter } from 'shiki'

let highlighter: any = null

export const useMarkdown = () => {
  const initHighlighter = async () => {
    if (!highlighter) {
      highlighter = await createHighlighter({
        themes: ['vitesse-dark', 'vitesse-light'],
        langs: [
          'javascript', 'typescript', 'vue', 'html', 'css',
          'json', 'yaml', 'markdown', 'bash', 'shell',
          'go', 'php', 'python', 'rust', 'sql'
        ],
      })
    }
    return highlighter
  }

  const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    breaks: true,
  })

  md.renderer.rules.fence = (tokens: any, idx: any, options: any, env: any, self: any) => {
    const token = tokens[idx]
    const code = token.content.trim()
    const lang = token.info?.trim() || ''
    
    return `<div class="code-block" data-lang="${lang}" data-code="${encodeURIComponent(code)}">
      <div class="code-header">
        <span class="code-lang">${lang || 'text'}</span>
        <div class="code-actions">
          <button class="code-btn copy-btn" data-action="copy" title="Copy code">
            <svg class="icon-copy" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
            <svg class="icon-check" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:none">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span class="btn-text">Copy</span>
          </button>
          <button class="code-btn download-btn" data-action="download" title="Download code">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            <span class="btn-text">Download</span>
          </button>
        </div>
      </div>
      <pre><code>${md.utils.escapeHtml(code)}</code></pre>
    </div>`
  }

  const render = async (content: string): Promise<string> => {
    const html = md.render(content)
    
    const hl = await initHighlighter()
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = html
    
    const codeBlocks = tempDiv.querySelectorAll('.code-block')
    for (const block of Array.from(codeBlocks)) {
      const lang = block.getAttribute('data-lang') || 'text'
      const code = decodeURIComponent(block.getAttribute('data-code') || '')
      const preElement = block.querySelector('pre')
      
      if (preElement) {
        try {
          const highlighted = hl.codeToHtml(code, {
            lang: lang === 'text' ? 'text' : lang,
            themes: {
              dark: 'vitesse-dark',
              light: 'vitesse-light',
            },
          })
          preElement.innerHTML = highlighted
        } catch (e) {
          console.warn(`Failed to highlight ${lang}:`, e)
        }
      }
    }
    
    return tempDiv.innerHTML
  }

  return {
    render,
    md,
  }
}
