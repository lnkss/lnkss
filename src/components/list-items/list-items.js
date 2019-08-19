// Загрузка основных модулей
import React from "react";

// Загрузка scss
import "./list-items.scss";

//Загрузка компонентов
import Mark from "../item";

// создание li элемента
const createMark = (mark, methods) => {
  return <Mark 
      key = { mark.id } 
      data = { mark } 
      deleteMark = { () => methods.deleteMark(mark.id)}
      swapMarks = { methods.swapMarks }>
    </Mark>
};

// массив li элементов
const createMarks = (props) => {
  // получаем массив точек из props
  const {data: { marks }, ...methods} = props;


  return marks.map( (mark) => {
    return createMark(mark, methods);
  });
}

const ListItems = (props) => {
  const marksList = createMarks(props);

  return (
    <ul className ="list-items">
      { marksList }
    </ul>
  )
}

export default ListItems;