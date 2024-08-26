// src/ShadeItem.tsx
import React from "react";
import { useDrag, useDrop } from "react-dnd";
import styled from "styled-components";

interface ShadeItemProps {
  shade: { id: number; url: string };
  index: number;
  moveShade: (fromIndex: number, toIndex: number) => void;
}

const ShadeItem: React.FC<ShadeItemProps> = ({ shade, index, moveShade }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "SHADE",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "SHADE",
    hover: (draggedItem: { index: number }) => {
      if (draggedItem.index !== index) {
        moveShade(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <ShadeItemContainer
      ref={(node) => drag(drop(node))}
      style={{
        opacity: isDragging ? 0.5 : 1,
        transform: isDragging ? "scale(1.1)" : "scale(1)",
        transition: "transform 0.2s ease",
      }}
    >
      <Image src={shade.url} alt={`shade-${shade.id}`} />
    </ShadeItemContainer>
  );
};

const ShadeItemContainer = styled.div`
  border-radius:30px;
  `;

const Image = styled.img`
  width: 150px;
  height: 150px;
  border-radius:10px;

  @media screen and (max-width: 486px) {
    & {
      width:100px;
      height:100px;
    }
  }
`;

export default ShadeItem;
