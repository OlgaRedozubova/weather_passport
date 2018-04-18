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



// const valueOf = (id) => document.getElementById(id).value;
//
// export const LoginForm = ( {login} ) => (
//     <div>
//         <h2>Login</h2>
//         <label>Username</label>
//         <input id="username" type="text" />
//         <label>Password</label>
//         <input id="password" type="password" />
//         <button
//             value="Submit"
//             onClick={() => {
//                 const username = valueOf('username');
//                 const password = valueOf('password');
//                 login(username, password);
//             }}
//         />
//     </div>
// )