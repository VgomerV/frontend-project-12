// import axios from 'axios';
// import { useDispatch } from 'react-redux';
// import { useFormik } from 'formik';
// import { setAddChannelActive } from '../../slices/modalsSlice';
// import * as yup from 'yup';

// const AddChannel = () => {
//   const validator = (data) => {
//     console.log('asdasd');
//     const schema = yup.object().shape({
//       channelName: yup.required(),
//     });
//     return schema.validate(data, { abortEarly: false });
//   };

//   const dispatch = useDispatch();

//   const formik = useFormik({
//     initialValues: {
//       channelName: "",
//     },
//     onSubmit: (values, { resetForm }) => {
//         validator(values.channelName).catch((error) => console.log(error.name))
//         const newChannel = { name: values.channelName, removable: true };
//         axios.post('/api/v1/channels', newChannel, {
//             headers: {
//                 Authorization: `Bearer ${localStorage.token}`,
//             },
//         }).then(() => {
//           dispatch(setAddChannelActive())
//         });
//         resetForm();
//     },
//   });

//   return (
//     <div>
//       <div className="fade modal-backdrop show"></div>
//       <div role="dialog" aria-modal="true" className="fade modal show" tabindex="-1" style={{display: 'block'}}>
//         <div className="modal-dialog modal-dialog-centered">
//           <div className="modal-content">
//             <div className="modal-header">
//               <div className="modal-title h4">
//                 Добавить канал
//               </div>
//               <button type="button" aria-label="Close" data-bs-dismiss="modal" className="btn btn-close" onClick={() => dispatch(setAddChannelActive())}/>
//             </div>
//             <div className="modal-body">
//               <form className="" onSubmit = {formik.handleSubmit}>
//                 <div>
//                   <input 
//                     name="channelName"
//                     type="channelName"
//                     id="channelName" 
//                     className="mb-2 form-control" 
//                     required
//                     value={formik.values.channelName}
//                     onChange={formik.handleChange}
//                   />
//                   <label className="visually-hidden" htmlFor="channelName">Имя канала</label>
//                   <div className="invalid-feedback"></div>
//                   <div className="d-flex justify-content-end">
//                     <button type="button" className="me-2 btn btn-secondary" onClick={() => dispatch(setAddChannelActive())}>Отменить</button>
//                     <button type="submit" className="btn btn-primary">Отправить</button>
//                   </div>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// };
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const AddChannel = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Example textarea</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
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
    </>
  );
};
export default AddChannel;