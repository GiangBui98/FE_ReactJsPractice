import axios from "./customize-axios";

const fetchAllUsers = (page) => {
    return axios.get(`/api/users?page=${page}`)
}

const postCreateUser = (name, job) => {
    return axios.post("/api/users", {name : name, job : job})
}

const putUpdateUser = (name, job) => {
    return axios.put("/api/users/", {name : name, job : job})
}

const deleteUser = (id) => {
    return axios.delete(`/api/users/${id}`)
}

export { fetchAllUsers, postCreateUser, putUpdateUser, deleteUser };



