import React, { Component } from 'react';
import moment from 'moment';
import DayPicker, { DateUtils } from 'react-day-picker';

const overlayStyle = {
  position: 'absolute',
  background: 'white',
  boxShadow: '0 2px 5px rgba(0, 0, 0, .15)',
};

export default class InputFieldOverlay extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showOverlay: false,
      value: '',
      selectedDay: null,
    };

    this.handleDayClick = this.handleDayClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputFocus = this.handleInputFocus.bind(this);
    this.handleInputBlur = this.handleInputBlur.bind(this);
    this.handleContainerMouseDown = this.handleContainerMouseDown.bind(this);
    this.returnValue = this.returnValue.bind(this);
  }

  componentWillUnmount() {
    clearTimeout(this.clickTimeout);
  }

  handleContainerMouseDown() {
    this.clickedInside = true;
    this.clickTimeout = setTimeout(() => {
      this.clickedInside = false;
    }, 0);
  }

  handleInputFocus() {
    this.setState({
      showOverlay: true,
    });
  }

  handleInputBlur() {
    const showOverlay = this.clickedInside;

    this.setState({
      showOverlay,
    });

    if (showOverlay) {
      this.input.focus();
    }
  }

  handleInputChange(e) {
    const { value } = e.target;
    const momentDay = moment(value, 'L', true);
    if (momentDay.isValid()) {
      this.setState({
        selectedDay: momentDay.toDate(),
        value,
      }, () => {
        this.daypicker.showMonth(this.state.selectedDay);
      });
    } else {
      this.setState({ value, selectedDay: null });
    }
  }


  handleDayClick(e, day) {
    this.setState({
      value: moment(day).format('L'),
      selectedDay: day,
      showOverlay: false,
    });
    return this.state.selectedDay;
    this.input.blur();
  }

  returnValue() {
    return this.state.value;
  }

  render() {
    return (
      <div onMouseDown={ this.handleContainerMouseDown }>
        <input
          type="text"
          ref={ (el) => { this.input = el; } }
          placeholder="DD/MM/YYYY"
          value={ this.state.value }
          onChange={ this.handleInputChange }
          onFocus={ this.handleInputFocus }
          onBlur={ this.handleInputBlur }
          className="form-control"
        />
        { this.state.showOverlay &&
          <div style={ { position: 'relative' } }>
            <div style={ overlayStyle }>
              <DayPicker
                ref={ (el) => { this.daypicker = el; } }
                onDayClick={ this.handleDayClick }
                selectedDays={ day => DateUtils.isSameDay(this.state.selectedDay, day) }
              />
            </div>
          </div>
        }
      </div>
    );
  }
}
