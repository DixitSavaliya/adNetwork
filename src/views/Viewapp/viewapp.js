import React, { Fragment } from 'react';
import { REMOTE_URL } from '../../redux/constants/index';
import { EventEmitter } from '../../event';
import { Link } from 'react-router-dom';
import './viewapp.css';
import {
    Badge,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Col,
    Collapse,
    DropdownItem,
    DropdownMenu,
    CardTitle,
    DropdownToggle,
    Fade,
    Form,
    CustomInput,
    FormGroup,
    FormText,
    FormFeedback,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupButtonDropdown,
    InputGroupText,
    Label,
    Row,
} from 'reactstrap';

class ViewApp extends React.Component {

    /** First Constructor Call */
    constructor(props) {
        super(props);
        this.state = {
            application: [],
            searchData: '',
            App: []
        }

    }

    componentDidMount() {
        if (this.props.id) {
            const obj = {
                application_id: this.props.id
            }
            this.props.getViewApplicationDetailsById(obj).then((res) => {
                var array = [];
                array.push(res.response.data);
                this.setState({
                    App: this.state.App = array
                })
            })
        }
    }


    render() {
        return (
            <div>
                <Row>
                    <Col xs="12" sm="12" md="12" lg="12" xl="12">
                        <Link to="/listapp">
                            <Button className="mb-2 mr-2" color="primary">
                                Go back
                                </Button>
                        </Link>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12" sm="12" md="12" lg="12" xl="12">
                        <Card className="main-card mb-3">
                            <CardHeader>
                                <CardTitle
                                    className="font"
                                >
                                    App Detail
                                            </CardTitle>
                            </CardHeader>
                            <CardBody>
                                <CardBody>

                                    <Row>
                                        <Col md="6">
                                            {
                                                this.state.App.map((data, index) =>
                                                    <div key={index}>
                                                        <h5>Name:</h5>
                                                        <p className="blue">{data.name}</p>
                                                    </div>
                                                )
                                            }
                                        </Col>
                                        <Col md="6">
                                            {
                                                this.state.App.map((data, index) =>
                                                    <div key={index}>
                                                        <h5>Package:</h5>
                                                        <p className="blue">{data.package}</p>
                                                    </div>
                                                )
                                            }
                                        </Col>

                                        <br />
                                        <Col md="6">
                                            {
                                                this.state.App.map((data, index) =>
                                                    <div key={index}>
                                                        <h5>Icon:</h5>
                                                        <img src={REMOTE_URL + data.icon} className="avatar-img" alt="admin@bootstrapmaster.com" />
                                                    </div>
                                                )
                                            }
                                        </Col>
                                        <Col md="6">
                                            {
                                                this.state.App.map((data, index) =>
                                                    <div key={index}>
                                                        <h5>Status:</h5>
                                                        <div className="btn_size">
                                                            {
                                                                data.status == 1 ? (
                                                                    <span className="badge badge-success">{data.status == 1 ? 'Active' : ''}</span>
                                                                ) : (
                                                                        <span className="badge badge-danger">{data.status == 0 ? 'InActive' : ''}</span>
                                                                    )
                                                            }
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        </Col>
                                        <br />
                                        <Col md="12" className="data">
                                            {
                                                this.state.App.map((data, index) =>
                                                    <div key={index}>
                                                        <h5>Discription:</h5>
                                                        <p className="blue">{data.description}</p>
                                                    </div>
                                                )
                                            }
                                        </Col>

                                    </Row>

                                </CardBody>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default ViewApp;