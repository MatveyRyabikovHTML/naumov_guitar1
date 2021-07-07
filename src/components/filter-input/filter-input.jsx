import React, {useEffect, useState, useCallback} from 'react';
import {connect} from 'react-redux';
import {splittingDigits, setCurrentValue, extend} from '../../utils';
import {getFilterByPrice, getDefaultPrice} from '../../store/selectors';
import {setFilterByPrice} from '../../store/action';
import {TypeFilterByPrice} from '../../const';
import PropTypes from 'prop-types';
import {priceFilter} from '../../prop-types/prop-types';

const FilterInput = ({type, labelTitle, filterPrice, defaultPrice, setValue}) => {
  const [focus, setFocus] = useState(false);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    setPrice(filterPrice[type]);
  }, [filterPrice, type, setPrice]);

  const handlePriceChange = useCallback((newPrice) => {
    setValue(extend(filterPrice, newPrice));
  }, [filterPrice, setValue]);

  const handleBlurChange = () => {
    const currentMin = type === TypeFilterByPrice.MIN ?
      defaultPrice[TypeFilterByPrice.MIN] :
      filterPrice[TypeFilterByPrice.MIN];
    const currentMax = type === TypeFilterByPrice.MAX ?
      defaultPrice[TypeFilterByPrice.MAX] :
      filterPrice[TypeFilterByPrice.MAX];

    setFocus(false);
    setCurrentValue(price, currentMin, currentMax, type, handlePriceChange);
  };

  return (
    <>
      <input
        className="filter__input"
        type="number"
        id={type}
        name={type}
        placeholder={splittingDigits(filterPrice[type])}
        value={focus ? price : splittingDigits(filterPrice[type])}
        onFocus={() => setFocus(true)}
        onBlur={handleBlurChange}
        onChange={(evt) => {
          setPrice(+evt.target.value);
        }}
      />
      <label className="visually-hidden" htmlFor={type}>{labelTitle}</label>
    </>
  );
};

FilterInput.propTypes = {
  type: PropTypes.string.isRequired,
  filterPrice: priceFilter.isRequired,
  defaultPrice: priceFilter.isRequired,
  labelTitle: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
};

const mapStateToProps = (store) => ({
  filterPrice: getFilterByPrice(store),
  defaultPrice: getDefaultPrice(store),
});

const mapDispatchToProps = (dispatch) => ({
  setValue(data) {
    dispatch(setFilterByPrice(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterInput);
