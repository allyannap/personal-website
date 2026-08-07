import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Wraps every word inside `root` in its own <span>, leaving existing child
 * elements (e.g. colored keyword spans) and whitespace untouched, so callers
 * can animate the returned spans individually.
 */
function splitIntoWordSpans(root: HTMLElement, className: string): HTMLElement[] {
  const words: HTMLElement[] = []
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
  const textNodes: Text[] = []
  let node: Node | null = walker.nextNode()
  while (node) {
    if (node.textContent && node.textContent.trim().length > 0) {
      textNodes.push(node as Text)
    }
    node = walker.nextNode()
  }

  textNodes.forEach((textNode) => {
    const parent = textNode.parentNode
    if (!parent) return
    const parts = textNode.textContent?.split(/(\s+)/) ?? []
    const fragment = document.createDocumentFragment()

    parts.forEach((part) => {
      if (part === '') return
      if (/^\s+$/.test(part)) {
        fragment.appendChild(document.createTextNode(part))
        return
      }
      const span = document.createElement('span')
      span.className = className
      span.style.display = 'inline-block'
      span.textContent = part
      fragment.appendChild(span)
      words.push(span)
    })

    parent.replaceChild(fragment, textNode)
  })

  return words
}

/**
 * Splits the text inside `container` into words and reveals them quickly,
 * top-to-bottom / left-to-right, as `trigger` scrolls into view. Returns a
 * cleanup function.
 */
export function revealWordsOnScroll(
  container: HTMLElement,
  trigger: Element = container,
): () => void {
  const originalHTML = container.innerHTML
  const words = splitIntoWordSpans(container, 'word-reveal')
  if (words.length === 0) return () => {}

  gsap.set(words, { opacity: 0, y: '0.4em' })

  const tween = gsap.to(words, {
    opacity: 1,
    y: '0em',
    duration: 0.5,
    ease: 'power2.out',
    stagger: 0.025,
    scrollTrigger: {
      trigger,
      start: 'top 85%',
      toggleActions: 'play none none none',
    },
  })

  return () => {
    tween.scrollTrigger?.kill()
    tween.kill()
    container.innerHTML = originalHTML
  }
}

/**
 * Reveals `items` (e.g. skill tag pills) left-to-right/quickly as `trigger`
 * scrolls into view. Returns a cleanup function.
 */
export function revealItemsOnScroll(
  items: Element[],
  trigger: Element,
): () => void {
  if (items.length === 0) return () => {}

  gsap.set(items, { opacity: 0, y: 12 })

  const tween = gsap.to(items, {
    opacity: 1,
    y: 0,
    duration: 0.4,
    ease: 'power2.out',
    stagger: 0.035,
    scrollTrigger: {
      trigger,
      start: 'top 85%',
      toggleActions: 'play none none none',
    },
  })

  return () => {
    tween.scrollTrigger?.kill()
    tween.kill()
    gsap.set(items, { clearProps: 'opacity,transform' })
  }
}
