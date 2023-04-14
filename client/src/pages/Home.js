import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import { ItemContext } from '../context/ItemContext';
import { Button, Card, Modal } from 'react-bootstrap';

const Home = () => {
    const { name, phone } = useContext(UserContext);
    const { items, requestItems, keepItem } = useContext(ItemContext);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        requestItems(() => {});
    }, []);

    const handleWant = async (name, phone, itemId) => {
        await keepItem(name, phone, itemId, () => handleShow());
    }

    return (
        <div className="container">
            <h3 className="mt-5 mb-5">Hello, welcome {name}!</h3>
            <div className="row">
                {
                    items.length > 0 ?
                        items.map(item => (
                            <div className="col-lg-3 col-md-6 col-sm-12 col-xs-12 mb-3" key={item._id}>
                                <Card>
                                    <Card.Header className={(item.owner.name === name && item.owner.phone === phone) ? 'bg-light' : 'bg-success'}>
                                        {(item.owner.name === name && item.owner.phone === phone) ? 'Owned' : 'Featured'}
                                    </Card.Header>
                                    <Card.Body>
                                        <Card.Title>{item.name}</Card.Title>
                                        <Card.Subtitle className="mb-2">{(item.owner.name === name && item.owner.phone === phone) ? '' :
                                            <div>
                                                <img style={{ width: '1.5rem' }} src="https://img.icons8.com/material/64/000000/person-male.png" alt="a profile icon" />
                                                <p style={{ display: 'inline-block', margin: '.2em' }}>{item.owner.name}</p>
                                            </div>
                                        }</Card.Subtitle>
                                        <Card.Text>{item.description}</Card.Text>
                                    </Card.Body>
                                    <Button onClick={() => handleWant(name, phone, item._id)} variant="light" disabled={(item.owner.name === name && item.owner.phone === phone) ? true : false}>
                                        Want
                                </Button>
                                </Card>
                            </div>
                        )) :
                        <h5 style={{ textAlign: 'center' }}>Opps, the market is empty. Try come later.</h5>
                }
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>Your interest of this item is recorded.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Home;