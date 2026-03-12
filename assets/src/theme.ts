/**
 * Theme initialization — must run before first render to prevent
 * flash of unstyled/incorrect theme. Loaded as a blocking script via
 * <script src="..."> (not deferred) in root.html.heex.
 */
function setTheme(theme: string | null) {
  if (!theme || theme === 'system') {
    localStorage.removeItem('phx:theme')
    document.documentElement.removeAttribute('data-theme')
  }
  else {
    localStorage.setItem('phx:theme', theme)
    document.documentElement.setAttribute('data-theme', theme)
  }
}

if (!document.documentElement.hasAttribute('data-theme')) {
  setTheme(localStorage.getItem('phx:theme') || 'system')
}

window.addEventListener('storage', (e) => {
  if (e.key === 'phx:theme')
    setTheme(e.newValue || 'system')
})

window.addEventListener('phx:set-theme', (e) => {
  setTheme((e.target as HTMLElement).dataset.phxTheme ?? 'system')
})
