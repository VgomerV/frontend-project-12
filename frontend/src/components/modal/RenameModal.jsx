import { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useEditChannelMutation } from '../../api/channelsApi.js';
import * as yup from 'yup';

const RenameModal = ({ modalState, handleClose }) => {
  const { auth } = useSelector((state) => state);
  const { token } = auth;
  const { channel } = modalState;
  const { channelsList } = useSelector((state) => state.channels);
  const channelNames = channelsList.map(({ name }) => name);

  const [editChannel, { error: editChannelError, isLoading: isEditChannel }] = useEditChannelMutation();

  const channelNameValidationSchema = yup.object().shape({
    channelName: yup.string()
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .notOneOf(channelNames, 'Должно быть уникальным')
      .required('Обязательное поле'),
  });

  const formik = useFormik({
    initialValues: {
      channelName: channel.name,
    },
    validationSchema: channelNameValidationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
        const newChannelName = values.channelName;
        editChannel({ id: channel.id, channel: { name: newChannelName } });
        handleClose();
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
        <Modal.Title>Переименовать канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Label hidden>Переименовать канал</Form.Label>
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
            <Button variant="secondary" className="me-2" onClick={handleClose}>Отменить</Button>
            <Button variant="primary" type="submit">Отправить</Button>
          </Container>
        </Form>
      </Modal.Body>
    </Modal>    
  );
};

export default RenameModal;