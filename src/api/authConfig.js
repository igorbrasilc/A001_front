import useAuth from '../hooks/useAuth.js';

const authConfig = () => {
    const { token } = useAuth();

    return {
        headers: {
        'Authorization': `Bearer ${token}`
    }
    }
};

export default authConfig;