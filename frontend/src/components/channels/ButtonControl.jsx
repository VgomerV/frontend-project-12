import { useDispatch, useSelector } from 'react-redux';
import { uniqueId } from 'lodash';
import { setIsControlChannelActive } from '../../slices/modalSlice';

const ButtonControl = ({ id, isActive, showClass }) => {
  const dispatch = useDispatch();

  return (
    <button 
      type="button"
      id="react-aria7886006692-:r0:"
      aria-expanded = {showClass !== ''}
      className={`flex-grow-0 dropdown-toggle dropdown-toggle-split btn ${isActive ? 'btn-secondary' : ''} ${showClass}`}
      onClick={() => dispatch(setIsControlChannelActive(id))}
    >
      <span className="visually-hidden">Управление каналом</span>
    </button>
  );
};

export default ButtonControl;