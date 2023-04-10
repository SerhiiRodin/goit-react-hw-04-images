import { useCallback, useEffect, useRef, useState } from 'react';
import { fetchImages } from 'services/services';
import Loader from 'components/Loader/Loader';
import css from './ImageGallery.module.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import Button from 'components/Button/Button';

export const ImageGallery = ({ inputValue }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [disabled, setDisabled] = useState(false);

  // state = {
  //   images: [],
  //   loading: false,
  //   error: null,
  //   page: 1,
  //   disabled: false,
  // };
  const isFirstRender = useRef(true);

  // const onFetchInfo = useCallback(() => {
  //   fetchImages(inputValue, page)
  //     .then(data => {
  //       console.log(data);
  //       setImages([...images, ...data.hits]);

  //       if (data.hits.length === 0) {
  //         toast.warn('Nothing found!!!', { autoClose: 1000 });
  //         setImages([]);
  //         setLoading(false);
  //         setError(true);
  //         setPage(1);
  //         setDisabled(false);

  //         return;
  //       }

  //       if (data.hits.length === 12) {
  //         setDisabled(true);
  //       } else {
  //         setDisabled(false);
  //       }
  //     })
  //     .catch(error => {
  //       toast.error('Connection error!!!', { autoClose: 1000 });

  //       setError(error);
  //       setDisabled(false);
  //       setImages([]);
  //     })
  //     .finally(() => setLoading(false));
  // }, [images, inputValue, page]);

  useEffect(() => {
    // if (isFirstRender) {
    //   isFirstRender.current = false;
    //   return;
    // }

    if (!inputValue) {
      console.log('Пустой inputValue');
      return;
    }

    const onFetchInfo = () => {
      fetchImages(inputValue, page)
        .then(data => {
          console.log(data);
          setImages(images => [...images, ...data.hits]);

          if (data.hits.length === 0) {
            toast.warn('Nothing found!!!', { autoClose: 1000 });
            setImages([]);
            setLoading(false);
            setError(true);
            setPage(1);
            setDisabled(false);

            return;
          }

          if (data.hits.length === 12) {
            setDisabled(true);
          } else {
            setDisabled(false);
          }
        })
        .catch(error => {
          toast.error('Connection error!!!', { autoClose: 1000 });

          setError(error);
          setDisabled(false);
          setImages([]);
        })
        .finally(() => setLoading(false));
    };

    console.log('новый запрос после сброса  параметров');
    onFetchInfo();
  }, [inputValue, page]);

  // componentDidUpdate(prevProps, prevState) {
  //   const prevInputValue = prevProps.inputValue;
  //   const thisInputValue = this.props.inputValue;
  //   // const page = this.state.page;

  //   if (
  //     prevInputValue === thisInputValue &&
  //     this.state.page !== prevState.page &&
  //     this.state.page === 1
  //   ) {
  //     console.log('новый запрос после сброса  параметров');
  //     onFetchInfo();
  //   }

  //   if (prevInputValue !== thisInputValue && this.state.page !== 1) {
  //     console.log('Сброс параметров при новом запросе');
  //     this.setState({ images: [], page: 1, disabled: false });
  //   }

  //   if (prevInputValue !== thisInputValue && this.state.page === 1) {
  //     console.log('выполняется при первом запросе');
  //     this.setState({
  //       page: 1,
  //       error: null,
  //       // images: [],
  //       loading: true,
  //       disabled: false,
  //     });
  //     onFetchInfo();
  //   }

  //   if (prevState.page !== this.state.page && this.state.page !== 1) {
  //     console.log('выполняется при смене page');
  //     // console.log(prevState.images);
  //     // console.log(this.state.images);
  //     this.setState({
  //       loading: true,
  //       error: null,
  //       // images: [],
  //       disabled: false,
  //     });
  //     onFetchInfo();
  //   }
  // }

  const loadMoreClick = () => {
    setPage(page => page + 1);
  };

  return (
    <>
      {images && (
        <ul className={css.ImageGallery}>
          {images.map(({ id, webformatURL, largeImageURL, tags }) => {
            return (
              <ImageGalleryItem
                key={id}
                webformatURL={webformatURL}
                largeImageURL={largeImageURL}
                tags={tags}
              />
            );
          })}
        </ul>
      )}
      {loading && <Loader />}
      {error && <p>Nothing found!!!</p>}
      {disabled && <Button loadMoreClick={loadMoreClick} />}
    </>
  );
};

// ----------------------Class------------------------------------------------

// export default class ImageGallery extends Component {
//   state = {
//     images: [],
//     loading: false,
//     error: null,
//     page: 1,
//     disabled: false,
//   };

//   componentDidUpdate(prevProps, prevState) {
//     const prevInputValue = prevProps.inputValue;
//     const thisInputValue = this.props.inputValue;
//     // const page = this.state.page;

//     if (
//       prevInputValue === thisInputValue &&
//       this.state.page !== prevState.page &&
//       this.state.page === 1
//     ) {
//       console.log('новый запрос после сброса  параметров');
//       this.onFetchInfo();
//     }

//     if (prevInputValue !== thisInputValue && this.state.page !== 1) {
//       console.log('Сброс параметров при новом запросе');
//       this.setState({ images: [], page: 1, disabled: false });
//     }

//     if (prevInputValue !== thisInputValue && this.state.page === 1) {
//       console.log('выполняется при первом запросе');
//       this.setState({
//         page: 1,
//         error: null,
//         // images: [],
//         loading: true,
//         disabled: false,
//       });
//       this.onFetchInfo();
//     }

//     if (prevState.page !== this.state.page && this.state.page !== 1) {
//       console.log('выполняется при смене page');
//       // console.log(prevState.images);
//       // console.log(this.state.images);
//       this.setState({
//         loading: true,
//         error: null,
//         // images: [],
//         disabled: false,
//       });
//       this.onFetchInfo();
//     }
//   }

//   onFetchInfo = () => {
//     fetchImages(this.props.inputValue, this.state.page)
//       .then(data => {
//         this.setState(prev => ({ images: [...prev.images, ...data.hits] }));
//         // console.log(data);
//         // console.log(data.hits.length);

//         if (data.hits.length === 0) {
//           toast.warn('Nothing found!!!', { autoClose: 1000 });
//           this.setState({
//             images: [],
//             loading: false,
//             error: true,
//             page: 1,
//             disabled: false,
//           });
//           return;
//         }

//         if (data.hits.length === 12) {
//           this.setState({ disabled: true });
//         } else {
//           this.setState({ disabled: false });
//         }
//       })
//       .catch(error => {
//         toast.error('Connection error!!!', { autoClose: 1000 });
//         this.setState({ error: error, disabled: false, images: [] });
//       })
//       .finally(() => this.setState({ loading: false }));
//   };

//   loadMoreClick = () => {
//     this.setState(prev => ({
//       page: prev.page + 1,
//     }));
//   };

//   render() {
//     const { images, error, loading, disabled } = this.state;

//     return (
//       <>
//         {images && (
//           <ul className={css.ImageGallery}>
//             {this.state.images.map(
//               ({ id, webformatURL, largeImageURL, tags }) => {
//                 return (
//                   <ImageGalleryItem
//                     key={id}
//                     webformatURL={webformatURL}
//                     largeImageURL={largeImageURL}
//                     tags={tags}
//                   />
//                 );
//               }
//             )}
//           </ul>
//         )}
//         {loading && <Loader />}
//         {error && <p>Nothing found!!!</p>}
//         {disabled && <Button loadMoreClick={this.loadMoreClick} />}
//       </>
//     );
//   }
// }
