import React, { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';

/*

a list component is a component that shows a list of items containing names.
it receives items from an array of objects as input and renders each individual
a single list of items from the items. if the item is clicked it changes the state
of the selectedIndex and changes the colour of the item's background.

It renders only the parent and only the child item that is updated because of the memo function

*/


// Single List Item
const WrappedSingleListItem = ({
  index,
  isSelected,
  onClickHandler,
  text,
}) => {
  return (
    <li
      style={{ backgroundColor: isSelected ? 'green' : 'red'}}
      onClick={onClickHandler(index)}
    >
      {text}
    </li>
  );
};

WrappedSingleListItem.propTypes = {
  index: PropTypes.number,
  isSelected: PropTypes.bool,
  onClickHandler: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

const SingleListItem = memo(WrappedSingleListItem);

// List Component
const WrappedListComponent = ({
  items,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(); ///// - corrected one mistake here

  useEffect(() => {
    setSelectedIndex(null);
  }, [items]);

  const handleClick = index => {
    setSelectedIndex(index);
  };

  const mapper=(item, index) => ( ///// - created a function to avoid momory leackage in production
    <SingleListItem
        key = {index}  ///// - provided key here to avoid warning and enable uniqueness for react component
        onClickHandler={handleClick(index)}
        text={item.text}
        index={index}
        isSelected={selectedIndex === index} ///// - corrected one logical error here
    />
  )

  return (
    <ul style={{ textAlign: 'left' }}>
      {items && items.map(mapper)} {/* corrected one mistake here to check for empty list */}
    </ul>
  )
};

WrappedListComponent.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({  ///// - corrected a mistake here in syntax
    text: PropTypes.string.isRequired,
  })),
};

WrappedListComponent.defaultProps = {
  items: null,
};

const List = memo(WrappedListComponent);

export default List;
