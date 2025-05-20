export default function useCustomMarks() {
  const stripCustomMarks = (html: string) => {
    const parser = new DOMParser()
    const doc = parser.parseFromString(html, 'text/html')
    const highlightSpans = doc.querySelectorAll('.fallacy-underline')

    highlightSpans.forEach((span) => {
      if (span.textContent && span.parentNode) {
        const textNode = document.createTextNode(span.textContent)
        span.parentNode.replaceChild(textNode, span)
      }
    })

    return doc.body.innerHTML
  }

  return { stripCustomMarks }
}
