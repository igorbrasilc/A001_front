
import React, { Component } from 'react';
import moment from 'moment';
import '../assets/Agenda/index.css';
import { ReactAgenda , ReactAgendaCtrl, guid , getUnique , getLast , getFirst , Modal } from 'react-agenda';

var now = new Date();

require('moment/locale/pt-br.js');

var colors= {
    'color-1':"rgba(102, 195, 131 , 1)" ,
    "color-2":"rgba(242, 177, 52, 1)" ,
    "color-3":"rgba(235, 85, 59, 1)"
  }
  
  var now = new Date();
  
  var items = [
    {
     _id            :guid(),
      name          : 'Meeting , dev staff!',
      startDateTime : new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 0),
      endDateTime   : new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 0),
      classes       : 'color-1'
    },
    {
     _id            :guid(),
      name          : 'Working lunch , Holly',
      startDateTime : new Date(now.getFullYear(), now.getMonth(), now.getDate()+1, 11, 0),
      endDateTime   : new Date(now.getFullYear(), now.getMonth(), now.getDate()+1, 13, 0),
      classes       : 'color-2 color-3'
    },
  
  ];
  
  export default class Agenda extends React.Component {
    constructor(props){
    super(props);
      this.state = {
        items:items,
        selected:[],
        cellHeight:30,
        showModal:false,
        locale:"pt-br",
        rowsPerHour:2,
        numberOfDays:4,
        startDate: new Date()
      }
      this.handleRangeSelection = this.handleRangeSelection.bind(this)
    this.handleItemEdit = this.handleItemEdit.bind(this)
    this.zoomIn = this.zoomIn.bind(this)
    this.zoomOut = this.zoomOut.bind(this)
    this._openModal = this._openModal.bind(this)
    this._closeModal = this._closeModal.bind(this)
    this.addNewEvent = this.addNewEvent.bind(this)
    this.removeEvent = this.removeEvent.bind(this)
    this.editEvent = this.editEvent.bind(this)
    this.changeView = this.changeView.bind(this)
    this.handleCellSelection = this.handleCellSelection.bind(this)
    }
  
  handleCellSelection(item){
    this._openModal();
  }
  handleItemEdit(item){
    console.log('handleItemEdit', item)
  }
  handleRangeSelection(item){
    console.log('handleRangeSelection', item)
  }
  changeView (days , event ){
    this.setState({numberOfDays:days})
  }
  _openModal(){
    this.setState({showModal:true})
  }
  _closeModal(e){
    if(e){
      e.stopPropagation();
      e.preventDefault();
    }
      this.setState({showModal:false})
  }
removeEvent(items , item){

    this.setState({ items:items});
}

addNewEvent (items , newItems){

  this.setState({showModal:false ,selected:[] , items:items});
  this._closeModal();
}
editEvent (items , item){

  this.setState({showModal:false ,selected:[] , items:items});
  this._closeModal();
}
  
  zoomIn(){
    var num = this.state.cellHeight + 15
        this.setState({cellHeight:num})
      }
      zoomOut(){
    var num = this.state.cellHeight - 15
        this.setState({cellHeight:num})
      }

    render() {
      return (
        <>
          <ReactAgenda
            minDate={now}
            maxDate={new Date(now.getFullYear(), now.getMonth()+3)}
            disablePrevButton={false}
            startDate={this.state.startDate}
            cellHeight={this.state.cellHeight}
            locale={this.state.locale}
            items={this.state.items}
            numberOfDays={this.state.numberOfDays}
            rowsPerHour={this.state.rowsPerHour}
            itemColors={colors}
            autoScale={false}
            fixedHeader={true}
            onItemEdit={this.handleItemEdit.bind(this)}
            onCellSelect={this.handleCellSelection.bind(this)}
            onRangeSelection={this.handleRangeSelection.bind(this)}/>

            {
            this.state.showModal ? 
            <Modal clickOutside={this._closeModal}>
                <div className="modal-content">
                    <ReactAgendaCtrl 
                    items={this.state.items}
                    itemColors={colors}
                    selectedCells={this.state.selected} 
                    Addnew={this.addNewEvent}
                    edit={this.editEvent} />
                </div>
            </Modal> : ''
            }
        </>
      );
    }
  }