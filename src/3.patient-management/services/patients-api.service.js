import http from '../../../src/shared/services/http-common.js';
export class ProductsApiService {
    getAll() {
        return http.get('/patients');
    }
    getById(id) {
        return http.get(`/patients/${id}`);
    }

    getByTitle(title) {
        return http.get(`/patients/${title}`);
    }

    create(data) {
        return http.post('/patients', data);
    }

    update(id, data) {
        return http.put(`/patients/${id}`, data);
    }

    delete(id) {
        return http.delete(`/products/${id}`);
    }

    findByTitle(title) {
        return http.get(`/products?title=${title}`);
    }
}