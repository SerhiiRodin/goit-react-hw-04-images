import { useCallback, useEffect } from 'react';
import css from './Modal.module.css';

export const Modal = ({ toggleModal, children }) => {
  const handleKeyDown = useCallback(
    event => {
      if (event.code === 'Escape') {
        toggleModal();
      }
    },
    [toggleModal]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const handleBackdropClick = event => {
    // console.log(event.target);
    // console.log(event.currentTarget);
    if (event.target === event.currentTarget) {
      toggleModal();
    }
  };

  return (
    <div className={css.Overlay} onClick={handleBackdropClick}>
      <div className={css.Modal}>{children}</div>
    </div>
  );
};

// ----------------------Class------------------------------------------------

// export default class Modal extends Component {
//   state = {};

//   componentDidMount() {
//     window.addEventListener('keydown', this.handleKeyDown);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.handleKeyDown);
//   }

//   handleKeyDown = event => {
//     if (event.code === 'Escape') {
//       this.props.toggleModal();
//     }
//   };

//   handleBackdropClick = event => {
//     // console.log(event.target);
//     // console.log(event.currentTarget);
//     if (event.target === event.currentTarget) {
//       this.props.toggleModal();
//     }
//   };

//   render() {
//     return (
//       <div className={css.Overlay} onClick={this.handleBackdropClick}>
//         <div className={css.Modal}>{this.props.children}</div>
//       </div>
//     );
//   }
// }
