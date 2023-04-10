import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { fetchImages } from 'services/services';
import { toast } from 'react-toastify';

import { ImageGallery } from 'components/ImageGallery';
import { Searchbar } from 'components/Searchbar';
import { Button } from 'components/Button';
import { Modal } from 'components/Modal';
import { Loader } from 'components/Loader';

export const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!inputValue) {
      // console.log('Пустой inputValue');
      return;
    }

    const onFetchInfo = () => {
      setLoading(true);
      setDisabled(false);
      fetchImages(inputValue, page)
        .then(data => {
          // console.log(data);
          setImages(images => [...images, ...data.hits]);
          setDisabled(page < Math.ceil(data.totalHits / 12));
          // console.log(data.totalHits);
          setLoading(false);

          if (!data.hits.length) {
            toast.warn('Nothing found!!!', { autoClose: 1000 });
            setLoading(false);
            return;
          }
        })
        .catch(error => {
          toast.error('Connection error!!!', { autoClose: 1000 });
        })
        .finally(() => setLoading(false));
    };

    console.log(' API запрос ');
    onFetchInfo();
  }, [inputValue, page]);

  const handleFormSubmit = inputValue => {
    setInputValue(inputValue);
    setPage(1);
    setImages([]);
  };

  const loadMoreClick = () => {
    setPage(page => page + 1);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleImageClick = largeImageURL => {
    toggleModal();
    setLargeImageURL(largeImageURL);
  };

  return (
    <div
      style={{
        textAlign: 'center',
      }}
    >
      <Searchbar handleFormSubmit={handleFormSubmit} />
      <ImageGallery onImageClick={handleImageClick} images={images} />

      {loading && <Loader />}

      {disabled && <Button loadMoreClick={loadMoreClick} />}

      {showModal && (
        <Modal toggleModal={toggleModal}>
          <img src={largeImageURL} alt={inputValue} />
        </Modal>
      )}

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
