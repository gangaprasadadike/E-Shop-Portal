package com.GangaprasadAdike.ecommerce.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.GangaprasadAdike.ecommerce.ExceptionHandler.ResponseStructure;
import com.GangaprasadAdike.ecommerce.model.Product;
import com.GangaprasadAdike.ecommerce.repository.ProductRepository;
@Service
public class ProductService {
	 @Autowired
	    private ProductRepository productRepository;

	    // ADD PRODUCT
	    public ResponseStructure<Product> addProduct(Product product) {

	        Product savedProduct = productRepository.save(product);

	        ResponseStructure<Product> response = new ResponseStructure<>();
	        response.setStatuscode(201);
	        response.setMessage("Product Added Successfully");
	        response.setData(savedProduct);

	        return response;
	    }

	    // GET ALL PRODUCTS
	    public ResponseStructure<List<Product>> getAllProducts() {

	        List<Product> products = productRepository.findAll();

	        ResponseStructure<List<Product>> response = new ResponseStructure<>();
	        response.setStatuscode(200);
	        response.setMessage("Products Fetched Successfully");
	        response.setData(products);

	        return response;
	    }

	    // DELETE PRODUCT
	    public ResponseStructure<String> deleteProduct(Long id) {

	        productRepository.deleteById(id);

	        ResponseStructure<String> response = new ResponseStructure<>();
	        response.setStatuscode(200);
	        response.setMessage("Product Deleted Successfully");
	        response.setData("Deleted");

	        return response;
	    }
	    
	    public ResponseStructure<Product> getProductById(Long id) {

	        Product product = productRepository.findById(id)
	                .orElseThrow(() -> new RuntimeException("Product not found"));

	        ResponseStructure<Product> response = new ResponseStructure<>();
	        response.setStatuscode(200);
	        response.setMessage("Product Found");
	        response.setData(product);

	        return response;
	    }
	    public ResponseStructure<Product> updateProduct(Long id, Product updatedProduct) {

	        Product existingProduct = productRepository.findById(id)
	                .orElseThrow(() -> new RuntimeException("Product not found"));

	        existingProduct.setName(updatedProduct.getName());
	        existingProduct.setPrice(updatedProduct.getPrice());
	        existingProduct.setDescription(updatedProduct.getDescription());

	        Product savedProduct = productRepository.save(existingProduct);

	        ResponseStructure<Product> response = new ResponseStructure<>();
	        response.setStatuscode(200);
	        response.setMessage("Product Updated Successfully");
	        response.setData(savedProduct);

	        return response;
	    }
}
