// Загрузка основных модулей
import React, { Component } from "react";

// Загрузка scss
import "./input-value.scss";

export default class InputValue extends Component  {
  constructor(props) {
    super(props)
    this.state = {
      value: ''
    }
  }

  // отправить название точки
  submitName = (evt) => {
    if (evt.keyCode === 13 && evt.target.value !== '') {
      this.props.addNewMark(evt.target.value);

      this.setState( {
        value: ''
      })
    }
  };

  // изменить состояние state, при изменении поля в input'e
  labelChanges = (evt) => {
    this.setState( {
        value: evt.target.value
    })
  }

  render() {
    const { value } = this.state;

    // класс для label
    let labelClass = 'input-point__text';

    // Если state не пустой(в input'e есть значение), добавляем класс для label'a
    if (value) {
      labelClass += ' input-point__text--focus'
    };

    return (
      <div className='input-point'>
        <div className='input-point__wrapper'>
          <input 
            className ='input' id='point' value = { value }
            onKeyDown = { this.submitName }
            onChange = { this.labelChanges }>
          </input>
          <label className={ labelClass } htmlFor='point'>Введите название точки</label>
        </div>
      </div>

    )
  }
}