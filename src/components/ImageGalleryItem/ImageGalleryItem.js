import {Modal} from 'components/Modal/Modal';
import { useState } from 'react';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ webformatURL, largeImageURL, tags }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <li className={css.ImageGalleryItem}>
      <img
        src={webformatURL}
        alt={tags}
        className={css['ImageGalleryItem-image']}
        onClick={toggleModal}
      />

      {showModal && (
        <Modal toggleModal={toggleModal}>
          <img src={largeImageURL} alt={tags} />
        </Modal>
      )}
    </li>
  );
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
