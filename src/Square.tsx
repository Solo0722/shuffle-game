import React from 'react'
import { useDrop } from 'react-dnd';
import { IMAGE, ItemTypes } from './constants';
import Tile from './Tile';
type SquareProps = {
  cardRef: any,
  item: IMAGE,
  onDrop: (item: any) => void,
  onClick: (item: any) => void,
  fixed: boolean,
  selected: boolean,
  dndItem: any,
  correct:boolean
}

const squareStyles = (selected:boolean) => {
    return {
        zIndex: selected ? 1 : 0,
        transform: selected ? 'scale(1.2)' : 'scale(1)',
    }
}

const Square = ({
  cardRef,
  item,
  onDrop,
  onClick,
  selected,
  fixed,
  correct,
  dndItem,
}:SquareProps) => {
  const [, drop] = useDrop({
    accept: ItemTypes.TILE,
    canDrop: () => !fixed,
    drop: onDrop,
  });

  const sty = squareStyles(selected);

  return (
    <div ref={cardRef}>
    <div
      className="card"
      style={sty}
      ref={drop}
      onClick={fixed ? undefined : onClick}
    >
      <Tile tileItem={item} item={dndItem} fixed={fixed} />
    </div>
      </div>
  );
};

export default Square