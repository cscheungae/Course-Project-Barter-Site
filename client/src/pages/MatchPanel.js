import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import { ItemContext } from '../context/ItemContext';
import { Button, Card, Modal } from 'react-bootstrap';

const MatchPanel = () => {
    const { name, phone } = useContext(UserContext);
    const { matchItem, deleteTrans } = useContext(ItemContext);

    const [trans, setTrans] = useState([]);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        async function fetchItem() {
            let data = await matchItem({ name, phone }, () => {
            });
            setTrans(Array.isArray(data) ? data : []);
        }
        fetchItem();
    }, []);

    const handleDeal = async (giveItemId, tradeItemId) => {
        await deleteTrans(giveItemId, tradeItemId, () => handleShow());
        let newData = await matchItem({ name, phone }, () => {
        });
        setTrans(Array.isArray(newData) ? newData : []);
    }

    return (
        <div className="container">
            <h3 className="mt-5 mb-5">Hi, {name}. You have {trans.length} possible barter deal(s).</h3>
            {trans.length > 0 ?
                trans.map(tran => (
                    <div className="row px-2 py-2 bg-light rounded" key={tran.give.item._id + tran.trade.item._id}>
                        <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 mb-3">
                            <Card className="give mx-3 my-3">
                                <Card.Header className="bg-success">
                                    Give
                                </Card.Header>
                                <Card.Body>
                                    <Card.Title>{tran.give.item.name}</Card.Title>
                                    <Card.Subtitle>
                                        <img style={{ width: '1.5rem' }} src="https://img.icons8.com/material/64/000000/person-male.png" alt="a profile icon" />
                                        <p style={{ display: 'inline-block', margin: '.2em' }}>{tran.give.owner.name}</p>
                                    </Card.Subtitle><Card.Subtitle>
                                        <img style={{ width: '1.5rem' }} src="https://img.icons8.com/metro/26/000000/phone.png" alt="a phone icon" />
                                        <p style={{ display: 'inline-block', margin: '.2em' }}>{tran.give.owner.phone}</p>
                                    </Card.Subtitle>
                                    <Card.Text>{tran.give.item.description}</Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                        <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12 mb-3">
                            <Card className="trade mx-3 my-3">
                                <Card.Header className="bg-danger">
                                    Trade
                                </Card.Header>
                                <Card.Body>
                                    <Card.Title>{tran.trade.item.name}</Card.Title>
                                    <Card.Subtitle>
                                        <img style={{ width: '1.5rem' }} src="https://img.icons8.com/material/64/000000/person-male.png" alt="a profile icon" />
                                        <p style={{ display: 'inline-block', margin: '.2em' }}>{tran.trade.buyer.name}</p>
                                    </Card.Subtitle>
                                    <Card.Subtitle>
                                        <img style={{ width: '1.5rem' }} src="https://img.icons8.com/metro/26/000000/phone.png" alt="a phone icon" />
                                        <p style={{ display: 'inline-block', margin: '.2em' }}>{tran.trade.buyer.phone}</p>
                                    </Card.Subtitle>
                                    <Card.Text>{tran.trade.item.description}</Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                        <Button onClick={() => handleDeal(tran.give.item._id, tran.trade.item._id)} variant="light" style={{ width: "100%" }}>
                            Deal
                        </Button>
                    </div>
                )) :
                ''
            }
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>The items are removed from the marketplace. Enjoy your new item.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default MatchPanel;