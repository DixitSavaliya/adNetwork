import React, { Fragment } from 'react';
import Swal from 'sweetalert2';
import { REMOTE_URL } from '../../redux/constants/index';
import { EventEmitter } from '../../event';
import './customads.css';
import { Link } from 'react-router-dom';
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

class CustomAds extends React.Component {

    /** First Constructor Call */
    constructor(props) {
        super(props);
        this.state = {
            publisherapp: '',
            advertiserapp: ''
        }
    }

    componentDidMount() {
        const obj = {
            user_id: this.props.auth.auth_data.id,
            user_group: this.props.auth.auth_data.user_group,
            search_string: ''
        }
        this.props.getPublisherApplication(obj).then((res) => {
            this.setState({
                publisherapp: res.response.data
            })
        })

        this.getAdvertiserApplication();
    }

    getAdvertiserApplication() {
        const obj = {
            user_id: this.props.auth.auth_data.id,
            user_group: this.props.auth.auth_data.user_group,
            ownership: 2,
            search_string: ''
        }
        this.props.getPublisherApplication(obj).then((res) => {
            this.setState({
                advertiserapp: res.response.data
            })
        })
    }

    render() {
        const { auth, applicationCount, applicationPGData, deleteApp } = this.props;

        return (
            <div>
                <Row>
                    <Col md="4">
                        <Form>
                            <FormGroup>
                                {/* <Label for="exampleCustomSelect"><b>Select Application</b></Label> */}
                                <Input
                                    type="select"
                                    id="exampleCustomSelect"
                                    name="customSelect"
                                    onChange={this.onItemSelect}
                                >
                                    <option value="">Select MyApp:</option>
                                    {
                                        this.state.publisherapp.length > 0 ? this.state.publisherapp.map((data, index) =>
                                            <option key={data.id} value={data.id}>{data.name}</option>
                                        ) : ''
                                    }
                                </Input>
                            </FormGroup>
                        </Form>
                    </Col>
                    <Col md="8">
                        <Button className="mb-2 mr-2" color="primary" disabled>
                            Save Settings
                        </Button>
                    </Col>
                </Row>
                <Card>
                    <CardHeader>
                        <strong style={{ color: '#20a8d8', fontSize: '20px' }}>Advertiser Application</strong>
                    </CardHeader>
                    <CardBody className="app_list">
                        {
                            this.state.advertiserapp.length > 0 ? (

                                <Row>
                                    {
                                        this.state.advertiserapp.map((data, index) =>
                                            <Col md="4" key={index}>
                                                <Form>
                                                    <Card>
                                                        {/* <CardHeader>
                                                            <strong style={{ color: '#20a8d8', fontSize: '20px' }}>Advertiser Application</strong>
                                                        </CardHeader> */}
                                                        <CardBody className="padding">
                                                            <Row>
                                                                <Col md="4">
                                                                    <Input
                                                                        type="checkbox"
                                                                        id="no"
                                                                        // onClick={this.checkAllHandler}
                                                                    />
                                                                    <img src={REMOTE_URL + data.icon} className="app-img" alt="admin@bootstrapmaster.com" />
                                                                </Col>
                                                                <Col md="8" className="content">
                                                                    <div>
                                                                        <span><b style={{ color: '#20a8d8', fontSize: '10px' }}> Name: </b>{data.name}</span>
                                                                    </div>
                                                                    <div>
                                                                        <span><b style={{ color: '#20a8d8', fontSize: '10px' }}> package: </b>{data.package}</span>
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

export default CustomAds;