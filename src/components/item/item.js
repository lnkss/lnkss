import React from "react";

import "./item.scss";
import dragAndDrop from "../../helpers/drag-and-drop";

const drag = new dragAndDrop();
let dragID, dropID;

const dragStart = (evt) => {

  drag.target = evt.target;
  dragID = evt.target.id;
  drag.target.classList.add('item--dragging');
  evt.dataTransfer.effectAllowed = 'move';

};

const dragEnter = (evt) => {

  evt.stopPropagation();
  if(evt.target === drag.target) return;

  drag.next = evt.target;
  dropID = evt.target.id;
  drag.next.classList.add('item--drag-enter');
};

const dragLeave = (evt) => {
  if(evt.target === drag.target) return;
  drag.next.classList.remove('item--drag-enter');
};


const Mark = ( {data, deleteMark, swapMarks}) => {
  const { name, isActive, id } = data;
  let classItem = "item";

  const dragEnd = () => {
    drag.insertTarget();
    swapMarks(parseInt(dragID), parseInt(dropID));
  };

  if (isActive) {
    classItem += " item--active";
  }
  return (
    <li 
      className = {classItem} 
      id = {id} 
      draggable = "true" 
      onDragStart = {dragStart}
      onDragEnter = {dragEnter}
      onDragLeave = {dragLeave}
      onDragEnd = {dragEnd}
      >

      <p className = "item__name">{ name }</p>
      <button className ="item__button" type="button" onClick = { deleteMark }>
        <i class="fas fa-trash item__icon"></i>  
      </button>

    </li>
  )
}

export default Mark;