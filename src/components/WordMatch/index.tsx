import React, { useState, useRef } from 'react'
import './style.css'

interface Ordinator {
  top: number
  left: number
}
interface Settings {
  first: Ordinator
  last: Ordinator
}

function WordMatch({ words }: { words: string[] }) {
  const [isAnimating, setIsAnimating] = useState(false)

  // Refs
  const destinationRef = useRef<HTMLDivElement>(null)
  const originRef = useRef<HTMLDivElement>(null)

  const flip = (node: HTMLElement, settings: Settings) => {
    const invert = {
      x: settings.first.left - settings.last.left,
      y: settings.first.top - settings.last.top,
    }

    let animation = node.animate(
      [
        { transform: `scale(1,1) translate(${invert.x}px, ${invert.y}px)` },
        { transform: `scale(1,1) translate(0, 0)` },
      ],
      {
        duration: 300,
        easing: 'ease',
      },
    )

    animation.onfinish = () => setIsAnimating(false)
  }

  const move = (node: HTMLElement) => {
    const id = Math.random()
    const container = node.closest('.container') as HTMLElement
    let rect = node.getBoundingClientRect()
    let first, last

    setIsAnimating(true)
    node.dataset.id = `${id}`
    container.dataset.id = `${id}`

    container.style.height = `${node.offsetHeight}px`
    container.style.width = `${node.offsetWidth}px`

    first = { top: rect.top, left: rect.left }
    destinationRef?.current?.insertAdjacentElement('beforeend', node)
    rect = node.getBoundingClientRect()
    last = { top: rect.top, left: rect.left }

    // Animation flip function
    flip(node, { first, last })
  }

  const putback = (node: HTMLElement) => {
    const id = node.dataset.id
    const container = originRef.current?.querySelector(
      `[data-id="${id}"]`,
    ) as HTMLElement

    let rect = node.getBoundingClientRect()
    let first, last

    setIsAnimating(true)

    first = { top: rect.top, left: rect.left }
    container.insertAdjacentElement('beforeend', node)
    rect = node.getBoundingClientRect()
    last = { top: rect.top, left: rect.left }

    flip(node, { first, last })

    container.style.height = ''
    container.style.width = ''
    container.removeAttribute('data-id')
    node.removeAttribute('data-id')
  }

  const handleMove = (event: React.MouseEvent<HTMLButtonElement>) => {
    const node = event.target as HTMLElement

    if (isAnimating) return
    node.closest('.container') ? move(node) : putback(node)
  }

  return (
    <div className="">
      <div className="words">
        <div className="destination" ref={destinationRef}></div>
        <div className="origin" ref={originRef}>
          {words.map((word, index) => (
            <div className="container" key={word + '_' + index}>
              <button className="word" onClick={handleMove} name={word}>
                {word}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default WordMatch
