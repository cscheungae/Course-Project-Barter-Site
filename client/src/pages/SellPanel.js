import React, { useContext, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { UserContext } from '../context/UserContext';
import { ItemContext } from '../context/ItemContext';

const SellPanel = () => {
    const { name, phone } = useContext(UserContext);
    const { sellItem } = useContext(ItemContext);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        await sellItem({
            userIdentity: { name, phone },
            productInfo: {
                name: form.name.value,
                description: form.description.value
            },
            cb: () => {
                document.getElementById('sellform').reset();
                handleShow();
            }
        });
    };

    return (
        <div className="container">
            <h3 className="mt-5 mb-5">{name}, what you want to sell?</h3>
            <Form id="sellform" onSubmit={handleSubmit}>
                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter the item name" />
                    {/* <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text> */}
                </Form.Group>

                <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" placeholder="Can you briefly describe the item?" />
                </Form.Group>

                <Button variant="success" type="submit">
                    Submit
                </Button>
            </Form>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>Your item can be seen by other barterer. Good Luck!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default SellPanel;