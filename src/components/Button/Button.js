import PropTypes from 'prop-types';
import css from './Button.module.css';

export function Button({ loadMoreClick }) {
  return (
    <button className={css.Button} type="button" onClick={loadMoreClick}>
      Load More
    </button>
  );
}

Button.propTypes = {
  loadMoreClick: PropTypes.func,
};
