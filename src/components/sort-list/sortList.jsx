import React, {PureComponent} from "react";
import {connect} from "react-redux";
import {ActionCreator} from '../../reducers/userActions/userActions';
import {FILTERS} from '../../consts.js';
export class SortList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
    }
    this.heandlerClickHead = this.heandlerClickHead.bind(this);
  }
  heandlerClickHead() {
    this.setState({active: !this.state.active});
  }
  handleClickItem(filterType) {
    this.setState({active: false});
    this.props.changeFilterType(filterType);
  }
  render() {
    const {currentFilter} = this.props;
    const {active} = this.state;
    const dropdownClass = active ? `places__options--opened` : ``;
    return (
      <form className="places__sorting" action="#" method="get">
        <span className="places__sorting-caption">Sort by</span>
        <span className="places__sorting-type" tabIndex="0" onClick={this.heandlerClickHead}>
          {
            FILTERS.find((filter) =>  filter.filterType === currentFilter).value
          }
          <svg className="places__sorting-arrow" width="7" height="4">
            <use xlinkHref="#icon-arrow-select"></use>
          </svg>
        </span>
        <ul className={`places__options places__options--custom ${dropdownClass}`}>
          {FILTERS.map((filter, i) => (
            <li
              className={`places__option ${
                currentFilter === filter.filterType ? `places__option--active` : ``
                }`}
              key={`filter` + i}
              tabIndex="0"
              onClick={() => {
                this.handleClickItem(filter.filterType);
              }}
            >
              {filter.value}
            </li>
          ))}
        </ul>
      </form>)
  }

}

const mapStateToProps = (state) => {
  return {
    currentFilter: state.userActions.filterType,
  }
};

const mapDispatchToProps = (dispatch) => ({
  changeFilterType: (city) => dispatch(ActionCreator.changeFilter(city))
});



export default connect(mapStateToProps, mapDispatchToProps)(SortList);