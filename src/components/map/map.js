// Загрузка основных модулей
import React, { Component } from "react";
import { YMaps, Map, Placemark, Polyline } from "react-yandex-maps";

// Загрузка scss
import "./map.scss";


export default class YandexMap extends Component  {
    constructor(props) {
      super(props)
      this.state = {
        center: [55.76, 37.34],
        zoom: 10 
      }
    }

    // соединить плейсмаркеры линией на карте
    connectPlacemarks = (data) => {
      const coords = data.map( el => el.coords);
      return <Polyline geometry = { coords }></Polyline>
    };

    /**
     * создать Placemark
     * @param {Object} mark - объект данных для создания placemark'a на карте
     * @param {Object} methods - включает себя функции для событий при работе с placemark'ом
     * @return {Function} возвращает функцию, которая создает placemark на карте
     */
    createPlacemark = (mark, methods) => {
      const {id, name, coords} = mark;

      return <Placemark 
          key ={id} 
          geometry = {coords}

          properties = {
            {
              hintContent: `Указатель на точку с именем ${name}`,
              balloonContent: `${name}`
            }
          }
    
          options = {{
            draggable:true
          }}
          onDrag = { (e) => methods.changePosition(id, e.get("target").geometry.getCoordinates())}
          // модули необходимо для подключения балуна и хинта
          modules = {['geoObject.addon.balloon', 'geoObject.addon.hint']}
          onBalloonOpen = {() => methods.changeMarkStatus(id)}
          onBalloonClose = {() => methods.changeMarkStatus(id)}>

        </Placemark>
    };

    // создать массив Placemark'ов
    createPlacemarks = (marks) => {
      const {data, ...methods} = marks;
      return data.map( (mark) => {
        return this.createPlacemark(mark, methods)
      });
    };


  render() {
    const { setCenterMap, ...data } = this.props;

    const placemarks = this.createPlacemarks(data);
    const polylines = this.connectPlacemarks(this.props.data);
    return (
      <div className ="map">
        <YMaps>
          <Map className = "map__container" 
            state = {this.state} 
            onBoundsChange = { (evt) => { setCenterMap (evt.get("target").getCenter())} }>
              { placemarks }
              { polylines }
          </Map>
        </YMaps>
      </div>
    )
  }
}
