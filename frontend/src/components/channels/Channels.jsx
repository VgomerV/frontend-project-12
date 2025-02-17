import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uniqueId } from 'lodash';
import { setCurrentChannel, setTypeModal } from '../../slices/channelsSlice.js';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import AddModal from '../modal/AddChannel.jsx';

const modalType = {
  add: AddModal,
  remove: () => null,
  rename: () => null,
};

const Channels = () => {
  const getModal = (isShow, handleClose) => {
    const Modal = modalType.add;
    if (!Modal) {
      return null;
    }
    return <Modal isShow={isShow} handleClose={handleClose} />;
  }

  const { channelsList, currentChannelID } =useSelector((state) => state.channels);
  const dispatch = useDispatch();

  const [isShow, setShow] = useState(false);
  const [typeModal, setTypeModal] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
   
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
      <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {channelsList.map(({ name, id, removable }) => {
          const variant = id === currentChannelID ? 'secondary' : '';

          if (!removable) {
            return (
              <li key = {uniqueId()} className="nav-item w-100">
                  <Button 
                    variant={variant} 
                    className="w-100 rounded-0 text-start"
                    onClick={() => dispatch(setCurrentChannel({ id, name }))}
                  >
                    <spa className="me-1">#</spa>
                    {name}
                  </Button>
              </li>
            );
          }

          return (
            <li key = {uniqueId()} className="nav-item w-100">
              <Dropdown as={ButtonGroup} className="d-flex">
                <Button
                  variant={variant}
                  className="w-100 text-start text-truncate rounded-0"
                  onClick={() => dispatch(setCurrentChannel({ id, name }))}
                >
                  <span className="me-1">#</span>
                  {name}
                </Button>
                <Dropdown.Toggle variant={variant}>
                  <span className="visually-hidden">Управление каналом</span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>Удалить</Dropdown.Item>
                  <Dropdown.Item>Переименовать</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              {/* <EditChannelModal
                channelId={channel.id}
                showModalHandler={showEditModal}
                closeModalHandler={handleCloseEditModal}
                submitHandler={handlers.handleEdit}
              />
              <RemoveChannelModal
                channelId={channel.id}
                showModalHandler={showRemoveModal}
                closeModalHandler={handleCloseRemoveModal}
                submitHandler={handlers.handleRemove}
              /> */}
            </li>
          );
        })}
      </ul>
      {getModal(isShow, handleClose)}
    </div>
  );
};

export default Channels;