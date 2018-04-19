import React from 'react';
import { Button, Form, FormGroup, InputGroup, FormControl} from 'react-bootstrap';

export default ( {login} ) =>{
    const valueOf = (id) => document.getElementById(id).value;
        return (
            <Form>
                <FormGroup>
                    <InputGroup>
                        <InputGroup.Addon><i className="fa fa-user"></i>
                        </InputGroup.Addon>
                        <FormControl id="username" type="text" placeholder = "Enter email"/>
                    </InputGroup>
                </FormGroup>

                <FormGroup>
                    <InputGroup>
                        <InputGroup.Addon><i className="fa fa-lock"></i></InputGroup.Addon>
                        <FormControl id="password" type="password" placeholder = "Password" />
                    </InputGroup>
                </FormGroup>

                <Button
                    type="submit"
                    onClick={(e) => {
                            e.preventDefault();
                            const username = valueOf('username');
                            const password = valueOf('password');
                            login(username, password);

                    }}
                >Sign in</Button>

            </Form>
        )
}
