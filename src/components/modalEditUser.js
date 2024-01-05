import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from 'react-toastify';
import { putUpdateUser } from "../services/usersService";

const ModalEditUser = (props) => {

  const {show, handleClose, dataUserEdit, handleEditUserFromModal} = props;
  const [name, setName] = useState("");
  const [job, setJob] = useState("");

  const handleEditUser = async() => { 
    let response = await putUpdateUser(name, job)
    console.log("response updaet user: ", response)
    if(response && response.updatedAt) {
      handleEditUserFromModal({
        first_name:name,   
        id: dataUserEdit.id
      })
      handleClose();
      toast.success("Update user successfully!")
      
    }
  }

  useEffect(() => {
    if(show) {
        setName(dataUserEdit.first_name)
    }

  }, [dataUserEdit]);

  console.log("check data user edit: ", dataUserEdit)
  
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton onClick={() => handleClose()}>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit user 
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Input your name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Job</label>
            <input
              type="text"
              className="form-control"
              placeholder="Input your job"
              value={job}
              onChange={(event) => setJob(event.target.value)}
            />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => handleClose()}>Close</Button>
        <Button onClick={() => handleEditUser()}>Confirm</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEditUser;
