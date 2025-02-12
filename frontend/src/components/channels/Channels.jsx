import { useDispatch, useSelector } from 'react-redux';
import ChannelsList from './ChannelsList';
import AddChannel from '../modal/AddChannel';
import { setAddChannelActive } from '../../slices/modalSlice';

import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const Channels = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();
  const stateModal = useSelector((state) => state.modals.addChannel.state);

  const { ids, entities } = useSelector((state) => state.channels);
  const channelsList = ids.map(id => entities[id]);

  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
          <b>Каналы</b>
          <button type="button" className="p-0 text-primary btn btn-group-vertical" onClick={handleShow}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
              <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"></path>
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"></path>
            </svg>
            <span className="visually-hidden">+</span>
          </button>
      </div>
      {ids ? <ChannelsList channelsList={channelsList} /> : null}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Добавить канал</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
              <Form.Control
                type="channelName"
                placeholder=""
                autoFocus
              />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Отменить
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Отправить
          </Button>
        </Modal.Footer>
      </Modal>
      {/* stateModal === 'open' ? <AddChannel /> : null */}
    </div>
  );
};

export default Channels;