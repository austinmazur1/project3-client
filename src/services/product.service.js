import axios from 'axios';


class ProductService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_SERVER_URL || "http://localhost:5005"
    });

    // Automatically set JWT token in the headers for every request
    this.api.interceptors.request.use((config) => {
      // Retrieve the JWT token from the local storage
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }

      return config;
    });
  }

  imageUpload = (formData) => {
    return this.api.post("/upload", formData)
  }

  updateBid = (id, currentPrice, currentBidder) => {
    const data = {
        currentPrice,
        currentBidder
    };
    return this.api.post(`/buyer/${id}`, data)
  }

  // POST /api/examples
  createProduct = async (data) => {
    return this.api.post("/seller/new-product", data);
  }

  // GET /api/examples
  getAllProductsSeller = async (userId) => {
    console.log(userId)
    return this.api.get("/seller/dashboard", {
      params: {
        userId: userId
      }
    });

  }
  getAllProductsBuyer = async () => {
    return this.api.get('/buyer/dashboard');
  }

  // GET /api/examples/:id
  getSingleProductSeller = async (id) => {
    return this.api.get(`/seller/${id}`);
  }
  getSingleProductBuyer = async (id) => {
    return this.api.get(`/buyer/${id}`);
  }

  // PUT /api/examples/:id
  updateProduct = async (id, update) => {
    return this.api.put(`/seller/${id}`, update);
  }

  updateWinner = async (id, currentBidder) => {
    try{
      const data = {currentBidder: currentBidder._id};
      const response = await this.api.put(`/buyer/${id}`, data);
      return response.data
    } catch(error) {
      throw error
    }
  }

  // DELETE /api/examples/:id
  deleteProject = async (id) => {
    return this.api.delete(`/seller/${id}`);
  } 


}

// Create one instance of the service
const productService = new ProductService();

export default productService;