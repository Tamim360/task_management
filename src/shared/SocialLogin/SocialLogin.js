import { Button } from '@material-tailwind/react';
import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';

const SocialLogin = () => {
    const { signInWithGoogle } = useContext(AuthContext)
    const navigate = useNavigate()
    const hndleSignIn = () => {
        signInWithGoogle()
        .then(res => {
            toast.success('Signed in successfully')
            navigate('/')
        })
        .catch(err => {})
    }
    return (
        <Button onClick={hndleSignIn} className="mt-2" variant="outlined" fullWidth>
            Sign In with Google
        </Button>
    );
};

export default SocialLogin;