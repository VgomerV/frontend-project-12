import { useDispatch, useSelector } from 'react-redux';
import { uniqueId } from 'lodash';
import { setCurrentChannel } from '../../slices/channelsSlice';
import ButtonControl from './ButtonControl';

const ChannelsList = ({ channelsList }) => {
  const dispatch = useDispatch();

  const currentChannelID = useSelector((state) => state.channels.currentChannelID);

  const stateModal = useSelector((state) => state.modals.controlChannel.state);
  const idOpenChannel = useSelector((state) => state.modals.controlChannel.currentChannelId);

  const isModalOpen = stateModal === 'open';

  return (
    <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
      {channelsList.map(({ name, id, removable }) => {
        const isActiveChannel = id === currentChannelID.toString();
        const showClass = isModalOpen && id === idOpenChannel ? 'show' : '';

        return (
          <li key = {uniqueId()} className="nav-item w-100">
            <div role="group" class={`d-flex dropdown btn-group ${showClass}`}>
              <button type="button" className={`w-100 rounded-0 text-start btn ${isActiveChannel ? "btn-secondary" : ""}`} onClick={() => dispatch(setCurrentChannel(id))}>
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
        );
      })}
    </ul>
  );
};

export default ChannelsList;
