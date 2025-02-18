import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// const ChannelsList = () => {
//   return (
//     <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
//       {channelsList.map(({ name, id, removable }) => {
//         const variant = id === currentChannelID ? 'secondary' : '';

//         if (!removable) {
//           return (
//             <li key = {uniqueId()} className="nav-item w-100">
//                 <Button 
//                   variant={variant} 
//                   className="w-100 rounded-0 text-start"
//                   onClick={() => dispatch(setCurrentChannel({ id, name }))}
//                 >
//                   <spa className="me-1">#</spa>
//                   {name}
//                 </Button>
//             </li>
//           );
//         }

//         return (
//           <li key = {uniqueId()} className="nav-item w-100">
//             <Dropdown as={ButtonGroup} className="d-flex">
//               <Button
//                 variant={variant}
//                 className="w-100 text-start text-truncate rounded-0"
//                 onClick={() => dispatch(setCurrentChannel({ id, name }))}
//               >
//                 <span className="me-1">#</span>
//                 {name}
//               </Button>
//               <Dropdown.Toggle variant={variant}>
//                 <span className="visually-hidden">Управление каналом</span>
//               </Dropdown.Toggle>
//               <Dropdown.Menu>
//                 <Dropdown.Item>Удалить</Dropdown.Item>
//                 <Dropdown.Item>Переименовать</Dropdown.Item>
//               </Dropdown.Menu>
//             </Dropdown>
//             {/* <EditChannelModal
//               channelId={channel.id}
//               showModalHandler={showEditModal}
//               closeModalHandler={handleCloseEditModal}
//               submitHandler={handlers.handleEdit}
//             />
//             <RemoveChannelModal
//               channelId={channel.id}
//               showModalHandler={showRemoveModal}
//               closeModalHandler={handleCloseRemoveModal}
//               submitHandler={handlers.handleRemove}
//             /> */}
//           </li>
//         );
//       })}
//     </ul>
//   );
// };

// export default ChannelsList;
