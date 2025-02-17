import axios from 'axios';
import { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { setCurrentChannel } from '../../slices/channelsSlice.js';
import * as yup from 'yup';

const AddModal = ({ isShow, handleClose }) => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);
  const { token } = auth;
  const { channelsList } =useSelector((state) => state.channels);
  const channelNames = channelsList.map(({ name }) => name);

  const channelNameValidationSchema = yup.object().shape({
    channelName: yup.string()
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .notOneOf(channelNames, 'Должно быть уникальным')
      .required('Обязательное поле'),
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
    if (isShow) inputRef.current.focus();
  }, [isShow]);

  return (
    <Modal
      show={isShow}
      onHide={handleClose}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Добавить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Label hidden>Добавить канал</Form.Label>
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

export default AddModal;
