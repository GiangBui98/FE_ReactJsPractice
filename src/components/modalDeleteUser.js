//import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from 'react-toastify';
import { deleteUser } from "../services/usersService";

const ModalDeletetUser = (props) => {
    const {show, handleClose, dataUserDelete, handleDeleteUserFromModal} = props;
 
    const confirmDeleteUser = async() => {
        let response = await deleteUser(dataUserDelete.id);
        if(response && +response.statusCode === 204){
            toast.success("Delete user successfully!")
            handleClose();
            handleDeleteUserFromModal(dataUserDelete);
        } else {
            toast.error("Error happens when deleting user...")
        }
        console.log("Check return id: ", response)
    }
  
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton onClick={() => handleClose()}>
        <Modal.Title id="contained-modal-title-vcenter">
          Delete user 
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="form-group">
            Are you sure to delete this user?
          </div>
          
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => handleClose()}>Close</Button>
        <Button onClick={() => confirmDeleteUser()}>Confirm</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalDeletetUser;
