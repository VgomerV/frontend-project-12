import { uniqueId } from 'lodash';

const ChannelsList = (storeChannels) => {
  const keys = storeChannels.channels.ids;
  const channels = storeChannels.channels.entities;

  return (
    <ul key = {uniqueId()} id = 'channels-box' className = 'nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block'>
      {keys.map((key) => {
        const { id, name } = channels[key];
        return (
          <li className = 'nav-item w-100'>
            <button type = 'button' className = 'w-100 rounded-0 text-start btn'>
              <span className = 'me-1'>#</span>
              {name}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default ChannelsList;
