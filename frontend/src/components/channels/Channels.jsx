import { useDispatch, useSelector } from 'react-redux';
import { uniqueId } from 'lodash';
import { setCurrentChannel } from '../../slices/channelsSlice';
import ButtonControl from './ButtonControl';

import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const Channels = () => {
  const dispatch = useDispatch();
  const { channelsList, currentChannelID } =useSelector((state) => state.channels);
  // const [show, setShow] = useState(false);

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  // const dispatch = useDispatch();
  // const stateModal = useSelector((state) => state.modals.addChannel.state);

  // const { ids, entities } = useSelector((state) => state.channels);
  // const channelsList = ids.map(id => entities[id]);

  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
          <b>Каналы</b>
          <button type="button" className="p-0 text-primary btn btn-group-vertical">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
              <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"></path>
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"></path>
            </svg>
            <span className="visually-hidden">+</span>
          </button>
      </div>
      <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {channelsList.map(({ name, id, removable }) => {
          const isActiveChannel = id === currentChannelID;
          const showClass = false && id === idOpenChannel ? 'show' : '';

          return (
            <li key = {uniqueId()} className="nav-item w-100">
              <div role="group" class={`d-flex dropdown btn-group ${showClass}`}>
                <button type="button" className={`w-100 rounded-0 text-start btn ${isActiveChannel ? "btn-secondary" : ""}`} onClick={() => dispatch(setCurrentChannel({ id, name }))}>
                  <span className="me-1">#</span>
                  {name}
                </button>
                {removable ?
                  <>
                    <ButtonControl id={id} isActive={isActiveChannel} showClass={showClass}/>
                    <div 
                      x-placement="bottom-end"
                      aria-labelledby="react-aria7886006692-:r0:"
                      className = {`dropdown-menu ${showClass}`}
                      data-popper-reference-hidden="false"
                      data-popper-escaped="false"
                      data-popper-placement="bottom-end"
                      style = {{ position: 'absolute', inset: '0px 0px auto auto', transform: 'translate(0px, 40px)' }}
                      >
                      <a data-rr-ui-dropdown-item="" className="dropdown-item" role="button" tabindex="0" href="#">Удалить</a>
                      <a data-rr-ui-dropdown-item="" className="dropdown-item" role="button" tabindex="0" href="#">Переименовать</a>
                    </div>
                  </>
                : null}
              </div>
            </li>
          )
        })}
      </ul>
      {/* {ids ? <ChannelsList channelsList={channelsList} /> : null}
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
      stateModal === 'open' ? <AddChannel /> : null */}
    </div>
  );
};

export default Channels;