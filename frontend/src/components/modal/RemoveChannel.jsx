import { useDispatch } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useRemoveChannelMutation } from '../../api/channelsApi.js';
import { resetCurrentChannel } from '../../slices/channelsSlice.js';

const RemoveModal = ({ modalState, handleClose }) => {
  const dispatch = useDispatch();
  const { channel } = modalState;

  const [removeChannel, { error: removeChannelError, isLoading: isRemovingChannel }] = useRemoveChannelMutation();
  const removeChannelHandler = (id) => {
    removeChannel(id);
    dispatch(resetCurrentChannel());
    handleClose();
  };

  return (
    <Modal
      show={modalState.isShow}
      onHide={handleClose}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Уверены?
        <Container className="d-flex justify-content-end px-0">
          <Button variant="secondary" className="me-2" onClick={handleClose}>Отменить</Button>
          <Button variant="danger" type="submit" onClick={() => removeChannelHandler(channel.id)}>Удалить</Button>
        </Container>
      </Modal.Body>
    </Modal>    
  );
};

export default RemoveModal;