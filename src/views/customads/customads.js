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

class CustomAds extends React.Component {

    /** First Constructor Call */
    constructor(props) {
        super(props);
        this.state = {
        
        }

    }

    render() {
        const { auth, applicationCount, applicationPGData, deleteApp } = this.props;

        return (
            <div>
               Hello  CustomAds
            </div>
        );
    }
}

export default CustomAds;