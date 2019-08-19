// Загрузка основных модулей
import React from "react";

// Загрузка scss
import "./user-panel.scss";

//Загрузка компонентов
import ListItems from "../list-items";
import InputValue from "../input-value";

const UserPanel = (props) => {

  return (
    <div className = "user-panel">
      <InputValue 
        addNewMark = { props.addNewMark }>
      </InputValue>

      <ListItems 
        data = { props.data } 
        deleteMark = { props.deleteMark } 
        swapMarks = { props.swapMarks }>
      </ListItems>
    </div>   
  )
};

export default UserPanel;