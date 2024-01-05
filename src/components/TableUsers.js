//import axios from 'axios';
import { useEffect } from "react";
import Table from "react-bootstrap/Table";
import { fetchAllUsers } from "../services/usersService";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import ModalAddNewUser from "./modalAddNewUser";
import ModalEditUser from "./modalEditUser";
import ModalDeletetUser from "./modalDeleteUser";
import _ from "lodash";

const TableUsers = (props) => {
  const [listUsers, setListUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [modalShow, setModalShow] = useState(false);

  const [modalShowEdit, setModalShowEdit] = useState(false);
  const [dataUserEdit, setDataUserEdit] = useState([]);

  const [modalShowDelete, setModalShowDelete] = useState(false);
  const [dataUserDelete, setDataUserDelete] = useState({});

  const handleClose = () => {
    setModalShow(false);
    setModalShowEdit(false);
    setModalShowDelete(false)
  };

  useEffect(() => {
    // call API

    getUsers(1);
  }, []);

  const getUsers = async (page) => {
    let response = await fetchAllUsers(page);

    console.log(">>>> check new response: ", response);

    if (response && response.data) {
      setListUsers(response.data);
      setTotalUsers(response.total);
      setTotalPages(response.total_pages);
    }

    //  console.log("Check respomse: ", response);
  };

  const handlePageClick = (event) => {
    // console.log("check lib para: ", event)
    // + : convert to int
    getUsers(+event.selected + 1);
  };

  //console.log(listUsers);

  const handleListUser = (user) => {
    setListUsers([user, ...listUsers]);
  };

  const handleEditUser = (user) => {
    //  console.log(user)
    setDataUserEdit(user);
    setModalShowEdit(true);
  };

  const handleEditUserFromModal = (user) => {
    let cloneListUser = _.cloneDeep(listUsers);
    let index = listUsers.findIndex((item) => item.id === user.id);
    cloneListUser[index].first_name = user.first_name;
    setListUsers(cloneListUser);
  };

  const handleDeleteUser = (user) => {
    setModalShowDelete(true)
    setDataUserDelete(user)
  };


  const handleDeleteUserFromModal = (user) => {
    let cloneListUser = _.cloneDeep(listUsers)
    cloneListUser = cloneListUser.filter(item => item.id !== user.id)
    setListUsers(cloneListUser)

    };

  //---------
  return (
    <>
      <div className="my-3 add-new">
        <span>
          <b>List Users:</b>
        </span>
        <button className="btn btn-success" onClick={() => setModalShow(true)}>
          Add new user{" "}
        </button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {listUsers &&
            listUsers.length > 0 &&
            listUsers.map((item, index) => {
              return (
                <tr key={`users-${index}`}>
                  {/*key will be the string, not index value */}
                  <td>{item.id}</td>
                  <td>{item.email}</td>
                  <td>{item.first_name}</td>
                  <td>{item.last_name}</td>
                  <td>
                    <button
                      className="btn btn-warning mx-3"
                      onClick={() => handleEditUser(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeleteUser(item)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={6}
        pageCount={totalPages}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="page-item"
      />
      <ModalAddNewUser
        show={modalShow}
        handleClose={handleClose}
        handleListUser={handleListUser}
      />

      <ModalEditUser
        show={modalShowEdit}
        dataUserEdit={dataUserEdit}
        handleClose={handleClose}
        handleEditUserFromModal={handleEditUserFromModal}
      />

      <ModalDeletetUser
        show={modalShowDelete}
        handleClose={handleClose}
        dataUserDelete = {dataUserDelete}
        handleDeleteUserFromModal={handleDeleteUserFromModal}
       
      />
    </>
  );
};

export default TableUsers;
