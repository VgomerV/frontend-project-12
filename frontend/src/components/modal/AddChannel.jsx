import { useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
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
import { setCurrentChannel } from '../../slices/currentChannelSlice.js';
import { useAddChannelMutation } from '../../api/channelsApi.js';

const AddModal = ({ modalState, handleClose }) => {
  const dispatch = useDispatch();
  const { channels } = modalState;
  const channelNames = channels.map(({ name }) => name);
  const { t } = useTranslation();
  const [addChannel] = useAddChannelMutation();

  const channelNameValidationSchema = yup.object().shape({
    channelName: yup.string()
      .min(3, t('modals.errors.maxMinLength'))
      .max(20, t('modals.errors.maxMinLength'))
      .notOneOf(channelNames, t('modals.errors.unique'))
      .required(t('modals.errors.require')),
  });

  const formik = useFormik({
    initialValues: {
      channelName: '',
    },
    validationSchema: channelNameValidationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values, { resetForm }) => {
      resetForm();
      handleClose();
      const newChannel = { name: filter.clean(values.channelName), removable: true };
      const { data } = await addChannel(newChannel);
      dispatch(setCurrentChannel(data));
      toast.success(t('toasts.add'));
    },
  });

  const inputRef = useRef();
  useEffect(() => {
    if (modalState.isShow) inputRef.current.focus();
  }, [modalState.isShow]);

  return (
    <Modal
      show={modalState.isShow}
      onHide={handleClose}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{t('modals.add.title')}</Modal.Title>
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
              isInvalid={formik.errors.channelName}
              ref={inputRef}
            />
            <Form.Control.Feedback type="invalid">{formik.errors.channelName}</Form.Control.Feedback>
            <Container className="d-flex justify-content-end px-0">
              <Button variant="secondary" className="me-2" onClick={handleClose}>{t('modals.add.cancell')}</Button>
              <Button variant="primary" type="submit">{t('modals.add.submit')}</Button>
            </Container>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddModal;
