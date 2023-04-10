import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({
  webformatURL,
  largeImageURL,
  tags,
  onImageClick,
}) => {
  return (
    <li className={css.ImageGalleryItem}>
      <img
        src={webformatURL}
        alt={tags}
        className={css['ImageGalleryItem-image']}
        onClick={() => {
          onImageClick(largeImageURL);
        }}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onImageClick: PropTypes.func.isRequired,
};

// ----------------------Class------------------------------------------------

// export default class ImageGalleryItem extends Component {
//   state = {
//     showModal: false,
//   };

//   toggleModal = () => {
//     this.setState(state => ({
//       showModal: !state.showModal,
//     }));
//   };

//   render() {
//     const { showModal } = this.state;
//     const { webformatURL, largeImageURL, tags } = this.props;
//     return (
//       <li className={css.ImageGalleryItem}>
//         <img
//           src={webformatURL}
//           alt={tags}
//           className={css['ImageGalleryItem-image']}
//           onClick={this.toggleModal}
//         />

//         {showModal && (
//           <Modal toggleModal={this.toggleModal}>
//             <img src={largeImageURL} alt={tags} />
//           </Modal>
//         )}
//       </li>
//     );
//   }
// }
