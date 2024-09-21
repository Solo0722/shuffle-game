import { useDrag } from 'react-dnd';
import { IMAGE, ItemTypes } from './constants';

const tileStyles = (isDragging: boolean, url) => {
  return {
    display: "flex",
    flex:1,
    backgroundImage: `url(${url})`,
    backgroundSize: "cover",
     backgroundPosition: "center",
     opacity: isDragging ? 0 : 1,
   };
 };


const Tile = ({ tileItem, item, fixed }: { fixed: boolean, tileItem: IMAGE, item: any }) => {
  

    const [{ isDragging }, drag] = useDrag({
      item,
      type: ItemTypes.TILE,
      canDrag: () => !fixed,
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    });
  
  const sty = tileStyles(isDragging, tileItem.url);


   
  return (
      <div draggable ref={drag} className="card"  style={sty}/>
  )
}

export default Tile