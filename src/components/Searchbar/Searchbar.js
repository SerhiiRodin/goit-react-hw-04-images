import { useState } from 'react';
import { ReactComponent as ImgSearch } from './search.svg';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import css from './Searchbar.module.css';

export const Searchbar = ({ handleFormSubmit }) => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = ({ target: { value } }) => {
    setInputValue(value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (inputValue.trim() === '') {
      return toast.error('Enter a keyword to search for a picture.');
    }

    handleFormSubmit(inputValue.trim());
    setInputValue('');
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css['SearchForm-button']}>
          <span>
            <ImgSearch fill="black" width="25" height="25" />
          </span>
        </button>

        <input
          className={css['SearchForm-input']}
          onChange={handleChange}
          type="text"
          placeholder="Search images and photos"
          value={inputValue}
          autoFocus
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  handleFormSubmit: PropTypes.func.isRequired,
};

// ----------------------Class------------------------------------------------

// export default class Searchbar extends Component {
//   state = {
//     inputValue: '',
//     hits: null,
//   };

//   handleChange = event => {
//     // console.log(event.target.value);
//     this.setState({ inputValue: event.target.value.toLowerCase() });
//   };

//   handleSubmit = event => {
//     event.preventDefault();

//     if (this.state.inputValue.trim() === '') {
//       return alert('Enter a keyword to search for a picture.');
//     }

//     this.props.handleFormSubmit(this.state.inputValue.trim());
//     this.setState({ inputValue: '' });
//   };

//   render() {
//     return (
//       <header className={css.Searchbar}>
//         <form className={css.SearchForm} onSubmit={this.handleSubmit}>
//           <button type="submit" className={css['SearchForm-button']}>
//             <span>
//               <ImgSearch fill="black" width="25" height="25" />
//             </span>
//           </button>

//           <input
//             className={css['SearchForm-input']}
//             onChange={this.handleChange}
//             type="text"
//             placeholder="Search images and photos"
//             value={this.state.inputValue}
//           />
//         </form>
//       </header>
//     );
//   }
// }
