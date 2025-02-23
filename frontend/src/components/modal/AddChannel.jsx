import axios from 'axios';
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
import { setCurrentChannel } from '../../slices/channelsSlice.js';

const AddModal = ({ modalState, handleClose }) => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);
  const { token } = auth;
  const { channelsList } = useSelector((state) => state.channels);
  const channelNames = channelsList.map(({ name }) => name);
  const { t } = useTranslation();

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
    onSubmit: (values, { resetForm }) => {
        const newChannel = { name: values.channelName, removable: true };
        axios.post('/api/v1/channels', newChannel, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then(({ data }) => {
          dispatch(setCurrentChannel(data));
          handleClose();
        });
        resetForm();
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
          <Form.Label hidden>{t('modals.add.title')}</Form.Label>
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
        </Form>
      </Modal.Body>
    </Modal>    
  );
};

export default AddModal;
