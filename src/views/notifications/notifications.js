import React, { Component } from 'react';
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
import { REMOTE_URL } from '../../redux/constants/index';
import { Link } from 'react-router-dom';

class Notifications extends Component {
    /** First Constructor Call */
    constructor(props) {
        super(props);
        this.state = {
            publisherapp: '',
            app_id: ''
        }
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        const obj = {
            user_id: this.props.auth.auth_data.id,
            user_group: this.props.auth.auth_data.user_group,
            ownership: 1,
            search_string: ''
        }
        this.props.getPublisherApplication(obj).then((res) => {
            this.setState({
                publisherapp: res.response.data
            })
        })
    }

    checkMaster(data) {
        data.forEach(element => {
            if (element._rowChecked == true) {
                element._rowChecked = true;
            } else {
                element._rowChecked = false;
            }
        });
        this.setState({
            publisherapp: data
        });
    }


    handleChange(item, e) {
        let _id = item.id;
        this.setState({
            app_id: this.state.app_id = _id
        })
        let ind = this.state.publisherapp.findIndex((x) => x.id == _id);
        let data = this.state.publisherapp;
        if (ind > -1) {
            let newState = !item._rowChecked;
            data[ind]._rowChecked = newState;
            if (!newState) {
                data[ind]._rowChecked = false;

            } else {
                data[ind]._rowChecked = true;
            }
            this.setState({
                publisherapp: data
            });
        }
        this.checkMaster(data);
    }


    render() {
        return (
            <div>
                <Card>
                    <CardHeader>
                        <strong style={{ color: '#20a8d8', fontSize: '20px' }}>Publisher Application</strong>
                    </CardHeader>
                    <CardBody className="app_list">
                        {
                            this.state.publisherapp.length > 0 ? (

                                <Row>
                                    {
                                        this.state.publisherapp.map((data, index) =>
                                            <Col md="4" key={index}>
                                                <Form>
                                                    <Card className="shadow_card">
                                                       
                                                        <CardBody className="padding">
                                                            <Row>
                                                                <Col md="2">
                                                                    <img src={REMOTE_URL + data.icon} className="app-img" alt="admin@bootstrapmaster.com" />
                                                                </Col>
                                                                <Col md="10" className="content">
                                                                    <div className="app_detail">
                                                                        <Input
                                                                            type="checkbox"
                                                                            id="no"
                                                                            onChange={() => this.handleChange(data)}
                                                                            checked={this.state.publisherapp[index]['_rowChecked'] == true}
                                                                        />
                                                                        <h6>Name: <p>{data.name}</p></h6>
                                                                        <h6>Package: <p>{data.package}</p></h6>
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                        </CardBody>
                                                    </Card>
                                                </Form>
                                            </Col>
                                        )
                                    }

                                </Row>
                            ) : (
                                    null
                                )
                        }
                    </CardBody>
                </Card>
            </div>
        );
    }
}

export default Notifications;
