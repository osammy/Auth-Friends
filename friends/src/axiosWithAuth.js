import axios from 'axios';

    export const axiosWithAuth = (props) => {
        const token = localStorage.getItem('token');
    
        return axios.create({
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`,
            },
        });
    };


