import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { postCreateUser } from "../services/usersService";
import { toast } from 'react-toastify';

const ModalAddNewUser = (props) => {

  const {handleClose, handleListUser} = props;
  const [name, setName] = useState("");
  const [job, setJob] = useState("");

  const handleSaveUser = async () => {
    let response = await postCreateUser(name, job);

    if (response && response.id) {
      handleClose();
      setName('');
      setJob('');
      toast.success("A new user is created successfully!")
      handleListUser({first_name:name, id:response.id})

    } else {
      toast.error("Error happened...")
    }

    console.log(">> check response: ", response);
  };

  
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton onClick={() => handleClose()}>
        <Modal.Title id="contained-modal-title-vcenter">
          Add new user 
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
        <Button onClick={() => handleSaveUser()}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalAddNewUser;
