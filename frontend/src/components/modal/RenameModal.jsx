import { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import {
  Container,
  Button,
  Form,
  Modal,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import filter from 'leo-profanity';
import { useEditChannelMutation } from '../../api/channelsApi.js';
import { setCurrentChannel } from '../../slices/channelsSlice.js';

const RenameModal = ({ modalState, handleClose }) => {
  const dispatch = useDispatch();
  const { channel } = modalState;
  const { channelsList } = useSelector((state) => state.channels);
  const channelNames = channelsList.map(({ name }) => name);
  const { t } = useTranslation();
  const [editChannel] = useEditChannelMutation();
  const inputRef = useRef();

  const channelNameValidationSchema = yup.object().shape({
    channelName: yup.string()
    .min(3, t('modals.errors.maxMinLength'))
    .max(20, t('modals.errors.maxMinLength'))
    .notOneOf(channelNames, t('modals.errors.unique'))
    .required(t('modals.errors.require')),
  });

  const formik = useFormik({
    initialValues: {
      channelName: channel.name,
    },
    validationSchema: channelNameValidationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      const newChannelName = filter.clean(values.channelName);
      await editChannel({ id: channel.id, channel: { name: newChannelName } });
      dispatch(setCurrentChannel(channel)); 
      handleClose();
      toast.success(t('toasts.rename'));
    },
  });

  useEffect(() => {
    if (modalState.isShow) {
      setTimeout(() => inputRef.current?.select(), 0);
    };
  }, [modalState.isShow]);

  const handleKeyDown = async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const error = await formik.validateForm();
      if (Object.keys(error).length > 0) {
        inputRef.current?.setSelectionRange(0, 0);
        inputRef.current?.blur();
      } else {
        formik.handleSubmit();
      }
    }
  };

  return (
    <Modal
      show={modalState.isShow}
      onHide={handleClose}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.rename.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group controlId="channelName">
            <Form.Label htmlFor="channelName" hidden>{t('modals.label')}</Form.Label>
            <Form.Control
              className="mb-3"
              type="text"
              onChange={formik.handleChange}
              id="channelName"
              name="channelName"
              value={formik.values.channelName}
              isInvalid={!!formik.errors.channelName}
              ref={inputRef}
              onKeyDown={handleKeyDown}
            />
          </Form.Group>
          <Form.Control.Feedback type="invalid">{formik.errors.channelName}</Form.Control.Feedback>
          <Container className="d-flex justify-content-end px-0">
            <Button variant="secondary" className="me-2" onClick={handleClose}>{t('modals.rename.cancell')}</Button>
            <Button variant="primary" type="submit">{t('modals.rename.submit')}</Button>
          </Container>
        </Form>
      </Modal.Body>
    </Modal>    
  );
};

export default RenameModal;
