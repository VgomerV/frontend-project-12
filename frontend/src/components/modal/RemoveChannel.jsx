import {
  Container,
  Button,
  Modal,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useRemoveChannelMutation } from '../../api/channelsApi.js';
import { resetCurrentChannel } from '../../slices/currentChannelSlice.js';

const RemoveModal = ({ modalState, handleClose }) => {
  const dispatch = useDispatch();
  const { selectedChannel } = modalState;
  const { currentChannelID } = useSelector((state) => state.currentChannel);
  const { t } = useTranslation();

  const [removeChannel] = useRemoveChannelMutation();
  const removeChannelHandler = (id) => {
    removeChannel(id);
    if (id === currentChannelID) {
      dispatch(resetCurrentChannel());
    }
    handleClose();
    toast.success(t('toasts.remove'));
  };

  return (
    <Modal
      show={modalState.isShow}
      onHide={handleClose}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.remove.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {t('modals.remove.question')}
        <Container className="d-flex justify-content-end px-0">
          <Button variant="secondary" className="me-2" onClick={handleClose}>{t('modals.remove.cancell')}</Button>
          <Button variant="danger" type="submit" onClick={() => removeChannelHandler(selectedChannel.id)}>{t('modals.remove.submit')}</Button>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveModal;
