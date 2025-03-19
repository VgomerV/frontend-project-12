import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from '../../slices/modalSlice.js';
import AddModal from './AddChannel.jsx';
import RemoveModal from './RemoveChannel.jsx';
import RenameModal from './RenameModal.jsx';

const modalType = {
  add: AddModal,
  remove: RemoveModal,
  edit: RenameModal,
};

const ModalManager = () => {
  const modalState = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const handleClose = () => dispatch(closeModal());
  const { type } = modalState;
  const Modal = modalType[type];

  if (!Modal) {
    return null;
  }

  return <Modal modalState={modalState} handleClose={handleClose} />;
};

export default ModalManager;
