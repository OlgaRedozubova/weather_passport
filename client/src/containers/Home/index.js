import React, { Component } from 'react';
import { Button, ButtonToolbar, Form, FormGroup, ControlLabel, FormControl, Grid, Row, Col, Table } from 'react-bootstrap';

import Weather from '../../components/Weather/index';

class Index extends Component {

    state = {
        response: '',
        body: {},
        bodyCity: {},
        city: '',
        isCity:false,
        townValue:''
    };
    componentDidMount() {
        this.callApi()
            .then(res => {this.setState({
                body: res,
            });
                console.log('body', this.state.body);
            })
            .catch(err => console.log(err));
    };


    callApi = async () => {
        const response = await fetch('/api/weather');
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);

        return body;
    };


    refreshPage = () => {
        this.callApi()
            .then(res => {this.setState({
                body: res,
            });
                console.log('body', this.state.body);
            })
            .catch(err => console.log(err));
    };

    callApi_City = async () => {
        const response = await fetch('/api/weather/' + this.state.townValue);
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body.main;
    };


    setCity = (e) =>{
        e.preventDefault();

        this.callApi_City()
            .then(res => {this.setState({bodyCity: res,
                isCity: true,
                city: this.state.townValue})})
            .catch(err => console.log(err));

    };


    addTown = () => {

        fetch('/api/towns/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: this.state.townValue,
            })
        })

        // .then((req,res) => {console.log('res',res.status);
        //
        // })
        .catch(err => console.log('err', err));

    };

    addTownRefresh =() => {
        this.addTown();
        this.refreshPage();

    };

    getValidationState() {
        const length = this.state.townValue.length;
        if (length > 3) return 'success';
        else if (length > 2) return 'warning';
        else if (length > 0) return 'error';
        return null;
    }

    handleChange = (e) => {
        console.log(e.target.value);
          this.setState({ townValue: e.target.value });
    };

    render(){

        const listTowns = [...this.state.body];
        return (
            <div className="home">
                <Form inline onSubmit={this.setCity}>

                    <FormGroup
                        controlId="formControlsText"
                        validationState={this.getValidationState()}
                    >
                        <ControlLabel>Город </ControlLabel>
                        <FormControl
                            type="text"
                           // value = {this.state.townValue}
                            placeholder="Please, input the city"
                            onChange={this.handleChange}
                        />
                        <Button  type="submit">OK</Button>
                        <Button bsStyle="success" onClick={this.addTown}>Add</Button>
                        <Button bsStyle="success" onClick={this.refreshPage}>Refresh</Button>
                    </FormGroup>
                </Form>
                <ButtonToolbar>
                    {/*<Button bsStyle="success" onClick={this.addTown}>Add</Button>*/}
                    <Button bsStyle="success" onClick={this.addTownRefresh}>Add_Refresh</Button>
                </ButtonToolbar>

                <div>
                    <h2>Первоначальные данные:</h2>
                    <Grid>
                        <Row>
                            <Col sm={6} md={4}>
                            Выберите город
                                {this.state.isCity &&
                                <Weather {...this.state}/>}

                            </Col>
                            <Col sm={6} md={8}>
                            temp

                                <Table striped bordered condensed hover>
                                    <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Temp</th>
                                        <th>Pressure</th>
                                        <th>Humidity</th>
                                        <th>Temp min</th>
                                        <th>Temp max</th>
                                    </tr>
                                    </thead>
                                    <tbody>

                                    {listTowns.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.name}</td>
                                        <td>{item.main.temp}</td>
                                        <td>{item.main.pressure}</td>
                                        <td>{item.main.humidity}</td>
                                        <td>{item.main.temp_min}</td>
                                        <td>{item.main.temp_max}</td>
                                    </tr>)
                                    )}

                                    </tbody>
                                </Table>
                            </Col>
                        </Row>

                    </Grid>

                </div>
                {/*<div className="container">*/}

                    {/*{this.state.isCity &&*/}
                    {/*<Weather {...this.state}/>}*/}
                {/*</div>*/}
            </div>
        )
    }
}

export default Index;