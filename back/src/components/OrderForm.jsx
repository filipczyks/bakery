import { api } from '../utils/api';

const OrderForm = () => {
    const handleSubmit = async (data) => {
        try {
            const response = await api.post('/orders', data);
            // obsługa odpowiedzi
        } catch (error) {
            // obsługa błędu
        }
    };
    
    // ... reszta komponentu
}; 