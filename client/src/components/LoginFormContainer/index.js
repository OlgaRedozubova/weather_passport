import { auth } from '../../api/api';
import { LoginForm } from '../LoginForm';

const mdtp = { auth };

export const LoginFormContainer = connect(null, mdtp)((props) => {
    let { auth } = props
    return <LoginForm login={auth} />
});