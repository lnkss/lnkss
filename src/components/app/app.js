// Загрузка основных модулей
import React, { Component } from "react";

// Загрузка scss
import "./app.scss";

//Загрузка компонентов
import UserPanel from "../user-panel";
import YandexMap from "../map";

export default class App extends Component {
  constructor(props) {
    super(props);
    // поле для формирование уникальных ключей для точек на карте
    this._id = 0;

    this.state = {
      marks: [],
      mapCenter :[55.76, 37.64],
    };
  };

  /**
   * Создать новую точку
   * @param {Number}  id - уникальный ID для точки
   * @param {String} name - имя точки
   * 
   * @returns {Object} Метод возвращает объект со свойствами точки
   */
  createNewMark = (id, name) => {
      return {
        id,
        name,
        coords: this.state.mapCenter,
        isActive: false
    };
  };

  /**
   * @param {String} name -имя новой точки
   */
  addMarkToState = (name) => {
        const id = this._id++;
        const mark = this.createNewMark(id, name);

        // изменяем state(массив точек)
        // создаём новый массив из старого массива + новый элемент
        this.setState ( ({ marks }) => {

          return {
            marks: [...marks, mark]
          }
        });
  };

  // Изменить центр карты
  setCenterMap = (mapCenter) => {
    this.setState( {
      mapCenter
    })
  };

  /**
   * Поменять точки местами
   * 
   */
  swapMarks = (first, second) => {
    const firstIdx = this.getIndex(this.state.marks, first);
    const secondIdx = this.getIndex(this.state.marks, second);
    const array = [...this.state.marks];

    firstIdx >= 0 ? array.splice(secondIdx, 0, ...array.splice(firstIdx, 1)) : array.splice(secondIdx + 1, 0, ...array.splice(firstIdx, 1));

    this.setState( () => {
      return {
        marks: array
      }
    });
  };

  // найти индекс в state массиве точек
  getIndex = (searchID) => this.state.marks.findIndex( (el) => el.id === searchID);

  // вставить изменённый элемент обратно в state
  insertModifiedMark = (indexMark,mark) => [
    ...this.state.marks.slice(0, indexMark), 
    mark,
     ...this.state.marks.slice(indexMark + 1)
    ];

  // Удалить точку
  deleteMark = (id) => {
    const idx = this.getIndex(id);

    this.setState( ({marks}) => {
      return {
        marks: [...marks.slice(0, idx), ...marks.slice(idx + 1)]
      }
    });
  };

  /**
   * Изменить координаты точки, после перетаскивания на карте
   * @param {Number} id - уникальный идентификатор точки
   * @param {Object} newCoords - новые координаты. Объект содержит координаты по X и Y
   */
  changePosition = (id, newCoords) => {
    const idx = this.getIndex(id);

    // создаём новую точку точку на основании предыдущих значений, но меняем координаты на текущие.
    const newMark = {...this.state.marks[idx], coords: newCoords};

    this.setState( () => {
      return {
        marks: this.insertModifiedMark(idx, newMark)
      }
    });
  };

  // изменять статус точки(активная || неактивная)
  changeMarkStatus = (id) => {
    const idx = this.getIndex(id);

    // создаём новую точку точку на основании предыдущих значений, но меняем статус активности точки(меняем на противоположный от текущего)
    const newMark = {...this.state.marks[idx], isActive: !this.state.marks[idx].isActive};

    this.setState(() => {
      return {
        marks: this.insertModifiedMark(idx, newMark)
      }
    })
  }

  render() {

    return (
      <div className ="app">
        <YandexMap 
          data = { this.state.marks } 
          changePosition = { this.changePosition } 
          setCenterMap = { this.setCenterMap }
          changeMarkStatus = { this.changeMarkStatus }>
        </YandexMap>
        
        <UserPanel 
          data = { this.state } 
          addNewMark = { this.addMarkToState } 
          deleteMark = {this.deleteMark}
          swapMarks = {this.swapMarks}
          onEditItem = {this.editItem}>
        </UserPanel>
      </div>
    )
  }
}