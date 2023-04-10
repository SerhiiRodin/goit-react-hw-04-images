import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';

export const App = () => {
  const [inputValue, setInputValue] = useState('');

  const handleFormSubmit = inputValue => {
    setInputValue(inputValue);
  };

  return (
    <div
      style={{
        textAlign: 'center',
      }}
    >
      <Searchbar handleFormSubmit={handleFormSubmit} />
      <ImageGallery inputValue={inputValue} />
      <ToastContainer />
    </div>
  );
};

// ----------------------Class------------------------------------------------
// export class App extends Component {
//   state = {
//     inputValue: '',
//   };

//   handleFormSubmit = inputValue => {
//     this.setState({ inputValue });
//   };

//   render() {
//     return (
//       <div
//         style={{
//           textAlign: 'center',
//         }}
//       >
//         <Searchbar handleFormSubmit={this.handleFormSubmit} />
//         <ImageGallery inputValue={this.state.inputValue} />
//         <ToastContainer />
//       </div>
//     );
//   }
// }
