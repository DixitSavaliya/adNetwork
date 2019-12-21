import React, { Fragment } from 'react';
import Swal from 'sweetalert2';
import { EventEmitter } from '../../event';
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

class MonetizationNetwork extends React.Component {

    /** First Constructor Call */
    constructor(props) {
        super(props);
        this.state = {

        }

    }

    componentDidMount() {
        const obj = {
            user_id: this.props.auth.auth_data.id,
            user_group: this.props.auth.auth_data.user_group,
            ownership: 1
        }
        // this.props.getPublisherApplication(obj).then((res) => {
        //     console.log("res",res);
        // })
    }

    render() {
        const { auth, applicationCount, applicationPGData, deleteApp } = this.props;

        return (
            <div>
                <Row>
                    <Col md="4">
                        <Form>
                            <FormGroup>
                                <Label for="exampleCustomSelect"><b>Select Application</b></Label>
                                <Input
                                    type="select"
                                    id="exampleCustomSelect"
                                    name="customSelect"
                                    onChange={this.onItemSelect}
                                >
                                    <option value="">Select MyApp:</option>
                                    {/* {
                                        this.state.userrole.length > 0 ? this.state.userrole.map((data, index) =>
                                            <option key={data.id} value={data.id}>{data.name}</option>
                                        ) : ''
                                    } */}
                                </Input>
                            </FormGroup>
                        </Form>
                        {/* {
                            this.state.selectroledata && !this.state.noData ? (
                                <Button className="mb-2 mr-2" color="primary" onClick={this.editUserRoleToRight}>
                                    Assign Rights
                                             </Button>
                            ) : (
                                    null
                                )
                        } */}
                    </Col>
                </Row>
            </div>
        );
    }
}

export default MonetizationNetwork;