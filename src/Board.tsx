import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Square from './Square';
import { IMAGE, ItemTypes, POS } from './constants';

type BoardProps = {
  cardsRef: React.MutableRefObject<any[]>,
  correctBoard: IMAGE[][],
  board: IMAGE[][],
  swap:(a:POS,b:POS) => void
}

const sameField = (a, b) => {
  return a.x === b.x && a.y === b.y;
};


const Board = ({ cardsRef,correctBoard,board,swap }:BoardProps) => {
      const W = 4
      const H = 4
  const [selected, setSelected] = React.useState(undefined);
   const [wallSize, setWallSize] = React.useState(0);


  return (
    <DndProvider
      backend={HTML5Backend}
      options={{ enableMouseEvents: true, preview: true }}
    >
      {(() => {
        const squares = [];
        for (let y = 0; y < H; ++y) {
          for (let x = 0; x < W; ++x) {
            squares.push(
              <Square
                cardRef={(el) => {
                  console.log(el,cardsRef.current[el]);
                  return (cardsRef.current[el] = el);
                }}
                key={[x, y].join(", ")}
                item={board[x][y]}
                fixed={false}
                correct={
                  board[x][y].id ===
                  correctBoard[x][y].id
                }
                dndItem={{
                  type: ItemTypes.TILE,
                  pos: { x, y },
                }}
                selected={
                  selected !== undefined && sameField(selected, { x, y })
                }
                onDrop={(item) => {
                  swap(item.pos, { x, y });
                }}
                onClick={() => {
                  if (selected === undefined) {
                    setSelected({ x, y });
                  } else {
                    if (!sameField(selected, { x, y })) {
                      swap(selected, { x, y });
                    }
                    setSelected(undefined);
                  }
                }}
                // wallSize={wallSize}
              />
            );
          }
        }
        return squares;
      })()}
    </DndProvider>
  );
}

export default Board