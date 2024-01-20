'use client'
import './ExpandableImage.css';
import { useState, useCallback } from 'react';
import Image from 'next/image'

const lqPath = '/character art/LQ/';
const hqPath = '/character art/HQ/';

export default function ExpandableImage({ image }: Props) {

  const [expanded, setExpanded] = useState(false);

  const open = useCallback(() => setExpanded(true), [setExpanded]);
  const close = useCallback(() => setExpanded(false), [setExpanded]);

  return (
    <>
      <button className="expandable-image image-button" onClick={open}>
        <Image className="w-100 h-100" width={image.dimensions.width} height={image.dimensions.height} src={lqPath + image.path} alt="Low quality (click for high quality)" />
      </button>
      {expanded && <div className="expandable-image primary dialog">
        <div className="expandable-image image-container">
          <Image width={image.dimensions.width} height={image.dimensions.height} src={hqPath + image.path} alt="High quality" />
        </div>
        {image.credits.map((credit, index) =>
          <p className="expandable-image credit" key={index}>
            {credit[0]}: <span dangerouslySetInnerHTML={{__html: credit[1]}}></span>
          </p>)}
        <button className="expandable-image close-button" onClick={close}>x</button>
      </div>}
    </>
  );
}

interface Props {
  image: JsonImage;
}
