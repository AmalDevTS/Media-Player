import React, { useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { addCategory, deleteCategory, getAllCategory } from '../services/allAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {
    const notify = () => toast("Wow so easy !");

    return (
        <div>
            <button onClick={notify}>Notify !</button>
            <ToastContainer />
        </div>
    );
}

function Category() {



    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [categoryName, setCategoryName] = useState()
    const [allCategory, setAllCategory] = useState([])
    console.log("===category name===", categoryName);
    const handleAddCategory = async () => {
        if (categoryName) {
            let body = {
                categoryName: categoryName,
                allVideos: []
            }
            const response = await addCategory(body)
            if (response.status == 201) {
                alert(`successfully added the category ${categoryName}`);
                setCategoryName("")
                handleClose();
                getAllCat();
            }
            else {
                toast.warn("Something went wrong")
            }
        }

        else {
            toast.warn("Please enter a category name")
        }

    }
    const getAllCat = async () => {
        const response = await getAllCategory();
        const { data } = response;
        console.log("===All categories===");
        console.log(response);
        setAllCategory(data);
    }
    useEffect(() => {
        getAllCat();
    }, [])
    const handleDelete= async(id)=>{
        await deleteCategory(id);
        getAllCat();
    }
    return (
        <>

            <div>
                <button className='btn btn-warning' onClick={handleShow}>Add New Category</button>
            </div>
            <div className='ms-1'>
                {
                    allCategory.length > 0 ?
                        allCategory.map(item => (
                            < div className='m-5 border border-secondary rounded p-3'>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <h6>{item.categoryName}</h6>
                                    <button className='btn btn-danger ms-3' onClick={()=>handleDelete(item.id)}>
                                        <i class="fa-solid fa-trash"></i>
                                    </button>
                                </div>
                            </div>

                        ))
                        :
                        <p>No categories to display</p>
                }
            </div >



            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        <i class="fa-solid fa-list me-3"></i>
                        Add Category
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Please fill the form</p>
                    <Form className='border border-secondary p-3 rounded'>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control type="text" placeholder="Enter Category Name" onChange={(e) => setCategoryName(e.target.value)} />

                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" className='btn btn-warning' onClick={handleAddCategory}>Add</Button>
                </Modal.Footer>
            </Modal>
            <ToastContainer
                position="top-center"
                autoClose={2000}
                theme='colored'
            >

            </ToastContainer>
        </>

    )
}

export default Category