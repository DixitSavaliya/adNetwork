import React, { Fragment } from 'react';
import Swal from 'sweetalert2';
import Switch from "react-switch";
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
            id: '',
            app_id: '',
            publisherapp: '',
            fb_interstitial: '',
            fb_banner: '',
            fb_native_banner: '',
            fb_native: '',
            admob_appid: '',
            admob_interstitial: '',
            admob_banner: '',
            admob_native_banner: '',
            admob_rewarded: '',
            mopub_interstitial: '',
            mopub_banner: '',
            mopub_native_banner: '',
            mopub_native: '',
            mopub_video: '',
            mopub_reward_video: '',
            checked: false,
            mopub_ads: false,
            admob_ads: false,
            fb_ads: true,
            updateMonetization: false,
            mainAds: false,
            showsection: false
        }
        this.handleChangeFBAds = this.handleChangeFBAds.bind(this);
        this.handleChangeAdMobAds = this.handleChangeAdMobAds.bind(this);
        this.handleChangeMopubAds = this.handleChangeMopubAds.bind(this);
        this.onItemSelect = this.onItemSelect.bind(this);
        this.addAppMonetization = this.addAppMonetization.bind(this);
        this.UpdateAppMonetization = this.UpdateAppMonetization.bind(this);
        this.handleChangeMainAds = this.handleChangeMainAds.bind(this);
        this.removeAppMonetization = this.removeAppMonetization.bind(this);
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
    }

    onItemSelect(event) {
        let _id = event.target.options[event.target.selectedIndex].value;
        this.setState({
            app_id: this.state.app_id = _id,
            showsection: this.state.showsection = true
        })
        const obj = {
            id: this.state.id,
            app_id: this.state.app_id
        }
        this.props.getAPPMonetization(obj).then((res) => {
            if (res.response.data) {
                if (res.response.message == "No Monetisations Found For This Application!") {
                    console.log("no data monetization");
                } else {
                    this.setState({
                        mainAds: this.state.mainAds = res.response.data.data.fb_ads == false && res.response.data.data.admob_ads == false && res.response.data.data.mopub_ads == false ? false : true,
                        id: this.state.id = res.response.data.id,
                        updateMonetization: this.state.updateMonetization = true,
                        fb_ads: this.state.fb_ads = res.response.data.data.fb_ads,
                        admob_ads: this.state.admob_ads = res.response.data.data.admob_ads,
                        fb_banner: this.state.fb_banner = res.response.data.data.fb_banner,
                        fb_native: this.state.fb_native = res.response.data.data.fb_native,
                        mopub_ads: this.state.mopub_ads = res.response.data.data.mopub_ads,
                        admob_appid: this.state.admob_appid = res.response.data.data.admob_appid,
                        mopub_video: this.state.mopub_video = res.response.data.data.mopub_video,
                        admob_banner: this.state.admob_banner = res.response.data.data.admob_banner,
                        mopub_banner: this.state.mopub_banner = res.response.data.data.mopub_banner,
                        mopub_native: this.state.mopub_native = res.response.data.data.mopub_native,
                        admob_rewarded: this.state.admob_rewarded = res.response.data.data.admob_rewarded,
                        fb_interstitial: this.state.fb_interstitial = res.response.data.data.fb_interstitial,
                        fb_native_banner: this.state.fb_native_banner = res.response.data.data.fb_native_banner,
                        admob_interstitial: this.state.admob_interstitial = res.response.data.data.admob_interstitial,
                        mopub_interstitial: this.state.mopub_interstitial = res.response.data.data.mopub_interstitial,
                        mopub_reward_video: this.state.mopub_reward_video = res.response.data.data.mopub_reward_video,
                        admob_native_banner: this.state.admob_native_banner = res.response.data.data.admob_native_banner,
                        mopub_native_banner: this.state.mopub_native_banner = res.response.data.data.mopub_native_banner
                    })
                }
            }
        })
    }

    handleChangeFBAds(checkedvalue) {
        this.setState({
            fb_ads: this.state.fb_ads = checkedvalue
        })
        if (this.state.fb_ads == true) {
            this.setState({
                admob_ads: this.state.admob_ads = false,
                mopub_ads: this.state.mopub_ads = false
            })
        }
    }

    handleChangeAdMobAds(checkedvalue) {
        this.setState({
            admob_ads: this.state.admob_ads = checkedvalue
        })
        if (this.state.admob_ads == true) {
            this.setState({
                fb_ads: this.state.fb_ads = false,
                mopub_ads: this.state.mopub_ads = false
            })
        }
    }

    handleChangeMopubAds(checkedvalue) {
        this.setState({
            mopub_ads: this.state.mopub_ads = checkedvalue
        })
        if (this.state.mopub_ads == true) {
            this.setState({
                fb_ads: this.state.fb_ads = false,
                admob_ads: this.state.admob_ads = false
            })
        }
    }

    handleChangeMainAds(checkedvalue) {
        this.setState({
            mainAds: this.state.mainAds = checkedvalue
        })
        if (this.state.mopub_ads == false) {
            this.setState({
                fb_ads: this.state.fb_ads = false,
                admob_ads: this.state.admob_ads = false,
                mopub_ads: this.state.mopub_ads = false
            })
        }
        this.UpdateAppMonetization();
    }

    addAppMonetization() {
        if (this.state.fb_ads == false && this.state.admob_ads == false && this.state.mopub_ads == false) {
            if (this.state.app_id) {
                var obj = {
                    id: this.state.id,
                    app_id: this.state.app_id,
                    status: "0",
                    data: {
                        id: this.state.id,
                        app_id: this.state.app_id,
                        status: "0",
                        fb_ads: this.state.fb_ads,
                        admob_ads: this.state.admob_ads,
                        fb_banner: this.state.fb_banner,
                        fb_native: this.state.fb_native,
                        mopub_ads: this.state.mopub_ads,
                        admob_appid: this.state.admob_appid,
                        mopub_video: this.state.mopub_video,
                        admob_banner: this.state.admob_banner,
                        mopub_banner: this.state.mopub_banner,
                        mopub_native: this.state.mopub_native,
                        admob_rewarded: this.state.admob_rewarded,
                        fb_interstitial: this.state.fb_interstitial,
                        fb_native_banner: this.state.fb_native_banner,
                        admob_interstitial: this.state.admob_interstitial,
                        mopub_interstitial: this.state.mopub_interstitial,
                        mopub_reward_video: this.state.mopub_reward_video,
                        admob_native_banner: this.state.admob_native_banner,
                        mopub_native_banner: this.state.mopub_native_banner
                    }
                }

                this.props.AddAppMonetization(obj).then((res) => {
                    console.log("addAppMonetization response", res);
                })

            } else {
                Swal.fire("Please Select App First!", "", "warning");
            }
        } else {
            if (this.state.app_id && this.state.mainAds == true) {
                var obj = {
                    id: this.state.id,
                    app_id: this.state.app_id,
                    status: "1",
                    data: {
                        id: this.state.id,
                        app_id: this.state.app_id,
                        status: "1",
                        fb_ads: this.state.fb_ads,
                        admob_ads: this.state.admob_ads,
                        fb_banner: this.state.fb_banner,
                        fb_native: this.state.fb_native,
                        mopub_ads: this.state.mopub_ads,
                        admob_appid: this.state.admob_appid,
                        mopub_video: this.state.mopub_video,
                        admob_banner: this.state.admob_banner,
                        mopub_banner: this.state.mopub_banner,
                        mopub_native: this.state.mopub_native,
                        admob_rewarded: this.state.admob_rewarded,
                        fb_interstitial: this.state.fb_interstitial,
                        fb_native_banner: this.state.fb_native_banner,
                        admob_interstitial: this.state.admob_interstitial,
                        mopub_interstitial: this.state.mopub_interstitial,
                        mopub_reward_video: this.state.mopub_reward_video,
                        admob_native_banner: this.state.admob_native_banner,
                        mopub_native_banner: this.state.mopub_native_banner
                    }
                }

                this.props.AddAppMonetization(obj).then((res) => {
                    console.log("addAppMonetization response", res);
                })

            } else {
                Swal.fire("Please Select App First!", "", "warning");
            }
        }
    }

    UpdateAppMonetization() {
        if (this.state.fb_ads == false && this.state.admob_ads == false && this.state.mopub_ads == false) {
            if (this.state.app_id) {
                var obj = {
                    id: this.state.id,
                    app_id: this.state.app_id,
                    status: "0",
                    data: {
                        id: this.state.id,
                        app_id: this.state.app_id,
                        status: "0",
                        fb_ads: this.state.fb_ads,
                        admob_ads: this.state.admob_ads,
                        fb_banner: this.state.fb_banner,
                        fb_native: this.state.fb_native,
                        mopub_ads: this.state.mopub_ads,
                        admob_appid: this.state.admob_appid,
                        mopub_video: this.state.mopub_video,
                        admob_banner: this.state.admob_banner,
                        mopub_banner: this.state.mopub_banner,
                        mopub_native: this.state.mopub_native,
                        admob_rewarded: this.state.admob_rewarded,
                        fb_interstitial: this.state.fb_interstitial,
                        fb_native_banner: this.state.fb_native_banner,
                        admob_interstitial: this.state.admob_interstitial,
                        mopub_interstitial: this.state.mopub_interstitial,
                        mopub_reward_video: this.state.mopub_reward_video,
                        admob_native_banner: this.state.admob_native_banner,
                        mopub_native_banner: this.state.mopub_native_banner
                    }
                }

                this.props.updateAppMonetization(obj).then((res) => {
                    console.log("updateAppMonetization response", res);
                })

            } else {
                Swal.fire("Please Active Main Switch!", "", "warning");
            }
        } else {
            if (this.state.app_id && this.state.mainAds == true) {
                var obj = {
                    id: this.state.id,
                    app_id: this.state.app_id,
                    status: "1",
                    data: {
                        id: this.state.id,
                        app_id: this.state.app_id,
                        status: "1",
                        fb_ads: this.state.fb_ads,
                        admob_ads: this.state.admob_ads,
                        fb_banner: this.state.fb_banner,
                        fb_native: this.state.fb_native,
                        mopub_ads: this.state.mopub_ads,
                        admob_appid: this.state.admob_appid,
                        mopub_video: this.state.mopub_video,
                        admob_banner: this.state.admob_banner,
                        mopub_banner: this.state.mopub_banner,
                        mopub_native: this.state.mopub_native,
                        admob_rewarded: this.state.admob_rewarded,
                        fb_interstitial: this.state.fb_interstitial,
                        fb_native_banner: this.state.fb_native_banner,
                        admob_interstitial: this.state.admob_interstitial,
                        mopub_interstitial: this.state.mopub_interstitial,
                        mopub_reward_video: this.state.mopub_reward_video,
                        admob_native_banner: this.state.admob_native_banner,
                        mopub_native_banner: this.state.mopub_native_banner
                    }
                }

                this.props.updateAppMonetization(obj).then((res) => {
                    console.log("updateAppMonetization response", res);
                })

            } else {
                Swal.fire("Please Select App First!", "", "warning");
            }
        }
    }

    removeAppMonetization() {
        if (this.state.app_id) {
            var obj = {
                id: this.state.id,
                app_id: this.state.app_id,
                status: "0",
                data: {
                    id: this.state.id,
                    app_id: this.state.app_id,
                    status: "0",
                    fb_ads: this.state.fb_ads,
                    admob_ads: this.state.admob_ads,
                    fb_banner: this.state.fb_banner,
                    fb_native: this.state.fb_native,
                    mopub_ads: this.state.mopub_ads,
                    admob_appid: this.state.admob_appid,
                    mopub_video: this.state.mopub_video,
                    admob_banner: this.state.admob_banner,
                    mopub_banner: this.state.mopub_banner,
                    mopub_native: this.state.mopub_native,
                    admob_rewarded: this.state.admob_rewarded,
                    fb_interstitial: this.state.fb_interstitial,
                    fb_native_banner: this.state.fb_native_banner,
                    admob_interstitial: this.state.admob_interstitial,
                    mopub_interstitial: this.state.mopub_interstitial,
                    mopub_reward_video: this.state.mopub_reward_video,
                    admob_native_banner: this.state.admob_native_banner,
                    mopub_native_banner: this.state.mopub_native_banner
                }
            }
            this.props.RemoveAppMonetization(obj).then((res) => {
                console.log("RemoveAppMonetization response", res);
            })
        }
    }

    render() {
        const { auth, applicationCount, applicationPGData, deleteApp } = this.props;
        return (
            <div>
                <Row>
                    <Col md="3">
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
                    {
                        this.state.updateMonetization == false ? (
                            null
                        ) : (
                                <Col md="3" style={{ textAlign: 'end' }}>
                                    <Row>
                                        <Col md="8">
                                            <span style={{ color: 'black', fontSize: '20px' }}>Inactive Ads:</span>
                                        </Col>
                                        <Col md="4">
                                            <Switch onChange={this.handleChangeMainAds} checked={this.state.mainAds} />
                                        </Col>
                                    </Row>
                                </Col>
                            )
                    }

                    {
                        this.state.updateMonetization == false ? (
                            null
                        ) : (
                                <Col md="3" style={{ textAlign: 'end' }}>
                                    {
                                        this.state.updateMonetization == false ? (
                                            null

                                        ) : (
                                                <Button className="mb-2 mr-2" color="danger" onClick={this.removeAppMonetization}>
                                                    Remove Advertisment
                                        </Button>
                                            )
                                    }
                                </Col>
                            )
                    }
                    {
                        this.state.showsection == true ? (
                            <Col md="3" style={{ textAlign: 'end' }}>
                                {
                                    this.state.updateMonetization == false ? (

                                        <Button className="mb-2 mr-2" color="primary" onClick={this.addAppMonetization}>
                                            Save Settings
                                                     </Button>
                                    ) : (
                                            <Button className="mb-2 mr-2" color="primary" onClick={this.UpdateAppMonetization}>
                                                Save Settings
                                                         </Button>
                                        )
                                }
                            </Col>
                        ) : (
                                null
                            )
                    }
                </Row>

                {/* Monetization setup */}
                <Row>
                    <Col xs="12" sm="12">
                        <Card>
                            <CardHeader>
                                <strong style={{ color: '#20a8d8', fontSize: '25px' }}>Monetisation Setup</strong>
                            </CardHeader>
                            <CardBody>
                                {
                                    this.state.showsection == true ? (
                                        <div>
                                            {/* Facebook ads*/}
                                            < Row >
                                                <Col xs="12" sm="12">
                                                    <Card>
                                                        <CardHeader>
                                                            <strong style={{ color: '#20a8d8', fontSize: '20px' }}>Facebook Ads Settings</strong>
                                                        </CardHeader>
                                                        <CardBody>
                                                            <Row>
                                                                <Col xs="6">
                                                                    <FormGroup>
                                                                        <Label htmlFor="fb_interstitial"><b>Facebook Interstitial</b></Label>
                                                                        <Input
                                                                            type="text"
                                                                            id="fb_interstitial"
                                                                            name="fb_interstitial"
                                                                            className="form-control"
                                                                            defaultValue={this.state.fb_interstitial}
                                                                            onChange={(e) =>
                                                                                this.state.fb_interstitial = e.target.value
                                                                            }
                                                                            placeholder="Enter Facebook Interstitial ID"
                                                                            required
                                                                        />
                                                                    </FormGroup>
                                                                </Col>
                                                                <Col xs="6">
                                                                    <FormGroup>
                                                                        <Label htmlFor="fb_banner"><b>Facebook Banner</b></Label>
                                                                        <Input
                                                                            type="text"
                                                                            id="fb_banner"
                                                                            name="fb_banner"
                                                                            className="form-control"
                                                                            defaultValue={this.state.fb_banner}
                                                                            onChange={(e) =>
                                                                                this.state.fb_banner = e.target.value
                                                                            }
                                                                            placeholder="Enter Facebook Banner ID"
                                                                            required
                                                                        />
                                                                    </FormGroup>
                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col xs="6">
                                                                    <FormGroup>
                                                                        <Label htmlFor="fb_native_banner"><b>Facebook Native Banner</b></Label>
                                                                        <Input
                                                                            type="text"
                                                                            id="fb_native_banner"
                                                                            name="fb_native_banner"
                                                                            className="form-control"
                                                                            defaultValue={this.state.fb_native_banner}
                                                                            onChange={(e) =>
                                                                                this.state.fb_native_banner = e.target.value
                                                                            }
                                                                            placeholder="Enter Facebook Native Banner ID"
                                                                            required
                                                                        />
                                                                    </FormGroup>
                                                                </Col>
                                                                <Col xs="6">
                                                                    <FormGroup>
                                                                        <Label htmlFor="fb_native"><b>Facebook Native</b></Label>
                                                                        <Input
                                                                            type="text"
                                                                            id="fb_native"
                                                                            name="fb_native"
                                                                            className="form-control"
                                                                            defaultValue={this.state.fb_native}
                                                                            onChange={(e) =>
                                                                                this.state.fb_native = e.target.value
                                                                            }
                                                                            placeholder="Enter Facebook Native ID"
                                                                            required
                                                                        />
                                                                    </FormGroup>
                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col xs="6">
                                                                    <FormGroup>
                                                                        <Label>
                                                                            <b>Facebook Ads</b>
                                                                        </Label>
                                                                        <br />
                                                                        <Switch onChange={this.handleChangeFBAds} checked={this.state.fb_ads} />
                                                                    </FormGroup>
                                                                </Col>
                                                            </Row>
                                                        </CardBody>
                                                    </Card>
                                                </Col>
                                            </Row>

                                            {/* Admob ads*/}
                                            <Row>
                                                <Col xs="12" sm="12">
                                                    <Card>
                                                        <CardHeader>
                                                            <strong style={{ color: '#20a8d8', fontSize: '20px' }}>AdMob Ads Settings</strong>
                                                        </CardHeader>
                                                        <CardBody>
                                                            <Row>
                                                                <Col xs="6">
                                                                    <FormGroup>
                                                                        <Label htmlFor="admob_appid"><b>Admob App ID</b></Label>
                                                                        <Input
                                                                            type="text"
                                                                            id="admob_appid"
                                                                            name="admob_appid"
                                                                            className="form-control"
                                                                            defaultValue={this.state.admob_appid}
                                                                            onChange={(e) =>
                                                                                this.state.admob_appid = e.target.value
                                                                            }
                                                                            placeholder="Enter Admob App ID"
                                                                            required
                                                                        />
                                                                    </FormGroup>
                                                                </Col>
                                                                <Col xs="6">
                                                                    <FormGroup>
                                                                        <Label htmlFor="admob_interstitial"><b>Admob Interstitial</b></Label>
                                                                        <Input
                                                                            type="text"
                                                                            id="admob_interstitial"
                                                                            name="admob_interstitial"
                                                                            className="form-control"
                                                                            defaultValue={this.state.admob_interstitial}
                                                                            onChange={(e) =>
                                                                                this.state.admob_interstitial = e.target.value
                                                                            }
                                                                            placeholder="Enter Admob Interstitial ID"
                                                                            required
                                                                        />
                                                                    </FormGroup>
                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col xs="6">
                                                                    <FormGroup>
                                                                        <Label htmlFor="admob_banner"><b>Admob Banner</b></Label>
                                                                        <Input
                                                                            type="text"
                                                                            id="admob_banner"
                                                                            name="admob_banner"
                                                                            className="form-control"
                                                                            defaultValue={this.state.admob_banner}
                                                                            onChange={(e) =>
                                                                                this.state.admob_banner = e.target.value
                                                                            }
                                                                            placeholder="Enter Admob Banner ID"
                                                                            required
                                                                        />
                                                                    </FormGroup>
                                                                </Col>
                                                                <Col xs="6">
                                                                    <FormGroup>
                                                                        <Label htmlFor="admob_native_banner"><b>Admob Native Banner</b></Label>
                                                                        <Input
                                                                            type="text"
                                                                            id="admob_native_banner"
                                                                            name="admob_native_banner"
                                                                            className="form-control"
                                                                            defaultValue={this.state.admob_native_banner}
                                                                            onChange={(e) =>
                                                                                this.state.admob_native_banner = e.target.value
                                                                            }
                                                                            placeholder="Enter Admob Native Banner ID"
                                                                            required
                                                                        />
                                                                    </FormGroup>
                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col xs="6">
                                                                    <FormGroup>
                                                                        <Label htmlFor="admob_rewarded"><b>Admob Reward Ads</b></Label>
                                                                        <Input
                                                                            type="text"
                                                                            id="admob_rewarded"
                                                                            name="admob_rewarded"
                                                                            className="form-control"
                                                                            defaultValue={this.state.admob_rewarded}
                                                                            onChange={(e) =>
                                                                                this.state.admob_rewarded = e.target.value
                                                                            }
                                                                            placeholder="Enter Admob Reward Ads ID"
                                                                            required
                                                                        />
                                                                    </FormGroup>
                                                                </Col>
                                                                <Col xs="6">
                                                                    <FormGroup>
                                                                        <Label>
                                                                            <b>AdMob Ads</b>
                                                                        </Label>
                                                                        <br />
                                                                        <Switch onChange={this.handleChangeAdMobAds} checked={this.state.admob_ads} />
                                                                    </FormGroup>
                                                                </Col>
                                                            </Row>
                                                        </CardBody>
                                                    </Card>
                                                </Col>
                                            </Row>

                                            {/* Mopub ads*/}
                                            <Row>
                                                <Col xs="12" sm="12">
                                                    <Card>
                                                        <CardHeader>
                                                            <strong style={{ color: '#20a8d8', fontSize: '20px' }}>Mopub Ads Settings</strong>
                                                        </CardHeader>
                                                        <CardBody>
                                                            <Row>
                                                                <Col xs="6">
                                                                    <FormGroup>
                                                                        <Label htmlFor="mopub_interstitial"><b>Mopub Interstitial</b></Label>
                                                                        <Input
                                                                            type="text"
                                                                            id="mopub_interstitial"
                                                                            name="mopub_interstitial"
                                                                            className="form-control"
                                                                            defaultValue={this.state.mopub_interstitial}
                                                                            onChange={(e) =>
                                                                                this.state.mopub_interstitial = e.target.value
                                                                            }
                                                                            placeholder="Enter Mopub Interstitial Ads ID"
                                                                            required
                                                                        />
                                                                    </FormGroup>
                                                                </Col>
                                                                <Col xs="6">
                                                                    <FormGroup>
                                                                        <Label htmlFor="mopub_banner"><b>Mopub Banner</b></Label>
                                                                        <Input
                                                                            type="text"
                                                                            id="mopub_banner"
                                                                            name="mopub_banner"
                                                                            className="form-control"
                                                                            defaultValue={this.state.mopub_banner}
                                                                            onChange={(e) =>
                                                                                this.state.mopub_banner = e.target.value
                                                                            }
                                                                            placeholder="Enter Mopub Banner Ads ID"
                                                                            required
                                                                        />
                                                                    </FormGroup>
                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col xs="6">
                                                                    <FormGroup>
                                                                        <Label htmlFor="mopub_native_banner"><b>Mopub Native Banner</b></Label>
                                                                        <Input
                                                                            type="text"
                                                                            id="mopub_native_banner"
                                                                            name="mopub_native_banner"
                                                                            className="form-control"
                                                                            defaultValue={this.state.mopub_native_banner}
                                                                            onChange={(e) =>
                                                                                this.state.mopub_native_banner = e.target.value
                                                                            }
                                                                            placeholder="Enter Mopub Native Banner Ads ID"
                                                                            required
                                                                        />
                                                                    </FormGroup>
                                                                </Col>
                                                                <Col xs="6">
                                                                    <FormGroup>
                                                                        <Label htmlFor="mopub_video"><b>Mopub Video Ads</b></Label>
                                                                        <Input
                                                                            type="text"
                                                                            id="mopub_video"
                                                                            name="mopub_video"
                                                                            className="form-control"
                                                                            defaultValue={this.state.mopub_video}
                                                                            onChange={(e) =>
                                                                                this.state.mopub_video = e.target.value
                                                                            }
                                                                            placeholder="Enter Mopub Video Ads ID"
                                                                            required
                                                                        />
                                                                    </FormGroup>
                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col xs="6">
                                                                    <FormGroup>
                                                                        <Label htmlFor="mopub_reward_video"><b>Mopub Reward Video Ads</b></Label>
                                                                        <Input
                                                                            type="text"
                                                                            id="mopub_reward_video"
                                                                            name="mopub_reward_video"
                                                                            className="form-control"
                                                                            defaultValue={this.state.mopub_reward_video}
                                                                            onChange={(e) =>
                                                                                this.state.mopub_reward_video = e.target.value
                                                                            }
                                                                            placeholder="Enter Mopub Reward Video Ads ID"
                                                                            required
                                                                        />
                                                                    </FormGroup>
                                                                </Col>
                                                                <Col xs="6">
                                                                    <FormGroup>
                                                                        <Label>
                                                                            <b>Mopub Ads</b>
                                                                        </Label>
                                                                        <br />
                                                                        <Switch onChange={this.handleChangeMopubAds} checked={this.state.mopub_ads} />
                                                                    </FormGroup>
                                                                </Col>
                                                            </Row>
                                                        </CardBody>
                                                    </Card>
                                                </Col>
                                            </Row>
                                        </div>

                                    ) : (
                                            null
                                        )
                                }

                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div >
        );
    }
}

export default MonetizationNetwork;