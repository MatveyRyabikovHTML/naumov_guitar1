import React from 'react';
import PropTypes from 'prop-types';

const PaginateButton = {
  BACK: `back`,
  ONWARD: `onward`,
  MORE: `more`,
};

const Paginate = ({activePage, pageCount, onChangePage}) => {
  const isFirstActive = activePage === 0;
  const isLastActive = activePage + 1 === pageCount;
  const near = isFirstActive ? (activePage + 2) :
    isLastActive ? (pageCount - 1) : activePage + 1;

  const handleItemClick = (evt) => {
    evt.preventDefault(evt.target.id);

    if (evt.target.id === PaginateButton.BACK && !isFirstActive) {
      onChangePage(activePage - 1);
      return;
    }

    if (evt.target.id === PaginateButton.ONWARD && !isLastActive) {
      onChangePage(activePage + 1);
      return;
    }

    if (evt.target.id !== PaginateButton.MORE && evt.target.id !== PaginateButton.ONWARD) {
      onChangePage(+evt.target.id);
    }
  };

  const paginateItems = [
    {
      id: PaginateButton.BACK,
      key: `btnBack`,
      className: ` paginate__link--back`,
      title: `Назад`,
      isHidden: isFirstActive,
    },
    {
      id: 0,
      key: `first`,
      className: `${activePage === 0 ? ` paginate__link--active` : ``}`,
      title: `1`,
      isHidden: false,
    },
    {
      id: PaginateButton.MORE,
      key: `more-first`,
      className: ` paginate__link--more`,
      title: `...`,
      isHidden: !(activePage >= 3),
    },
    {
      id: activePage - 1,
      key: `left`,
      className: ``,
      title: near - 1,
      isHidden: !(activePage >= 2 && !(activePage === pageCount - 1)),
    },
    {
      id: (near - 1),
      key: `near`,
      className: `${activePage === (near - 1) ? ` paginate__link--active` : ``}`,
      title: near,
      isHidden: !(pageCount > 2),
    },
    {
      id: activePage + 1,
      key: `right`,
      className: ``,
      title: near + 1,
      isHidden: activePage === 0 || pageCount <= 3 || (activePage >= pageCount - 2),
    },
    {
      id: PaginateButton.MORE,
      key: `more-last`,
      className: ` paginate__link--more`,
      title: `...`,
      isHidden: pageCount <= 3 || (activePage >= pageCount - 3) || (activePage === 1 && pageCount === 4),
    },
    {
      id: (pageCount - 1),
      key: `last`,
      className: `${activePage === (pageCount - 1) ? ` paginate__link--active` : ``}`,
      title: pageCount,
      isHidden: !(pageCount > 1),
    },
    {
      id: PaginateButton.ONWARD,
      key: `onward`,
      className: ` paginate__link--onward${isLastActive ? ` paginate__link--disabled` : ``}`,
      title: `Далее`,
      isHidden: false,
    },
  ];

  return (
    <ul className="paginate">
      {
        paginateItems.map(({id, key, className, title, isHidden}) => {
          if (isHidden) {
            return null;
          }
          return (
            !isHidden &&
            <li className="paginate__item" key={key}>
              {/*eslint-disable-next-line*/}
              <a
                className={`paginate__link${className}`}
                id={id}
                onClick={handleItemClick}>
                {title}
              </a>
            </li>
          );
        })
      }
    </ul>
  );
};

Paginate.propTypes = {
  activePage: PropTypes.number.isRequired,
  pageCount: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
};

export default Paginate;
