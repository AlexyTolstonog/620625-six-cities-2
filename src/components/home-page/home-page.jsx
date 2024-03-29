import React from 'react';
import PropTypes from 'prop-types';
import CardList from '../card-list/card-list.jsx';
import Map from '../map/map.jsx';
import CitiList from '../citi-list/citi-list.jsx';
import { connect } from 'react-redux';
import SortList from '../sort-list/sortList.jsx';

export const HomePage = (props) => {
  const {city, offersPlace} = props;
  const cityOffers = offersPlace.filter((offer) => offer.city.name === city);
  return <div className="page page--gray page--main">
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <a className="header__logo-link header__logo-link--active">
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </a>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                <a className="header__nav-link header__nav-link--profile" href="#">
                  <div className="header__avatar-wrapper user__avatar-wrapper">
                  </div>``
                  <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>

    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
        {offersPlace.length > 0 &&  <CitiList/>}
        </section>
      </div>
      <div className="cities">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">{cityOffers.length} places to stay in {city}</b>
            <SortList
            />
           {offersPlace.length> 0 && <CardList/>}

          </section>
          <div className="cities__right-section">
        {cityOffers.length> 0 &&  <Map/>}
          </div>
        </div>
      </div>
    </main>
  </div>;
};
HomePage.propTypes = {
  cityOffers: PropTypes.arrayOf(
    PropTypes.shape({})
  ),
  city: PropTypes.string,
};

const mapStateToProps = (state) => {
  return {
    offersPlace: state.serverData.offersPlace,
    city: state.userActions.city,
  }
}

export default connect(mapStateToProps)(HomePage);