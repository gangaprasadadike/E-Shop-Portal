package com.GangaprasadAdike.ecommerce.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.GangaprasadAdike.ecommerce.ExceptionHandler.ResponseStructure;
import com.GangaprasadAdike.ecommerce.model.Product;
import com.GangaprasadAdike.ecommerce.service.ProductService;

@RestController
@RequestMapping("/products")
public class ProductController {
	 @Autowired
	    private ProductService productService;

	    // ADD PRODUCT
	    @PostMapping
	    public ResponseEntity<ResponseStructure<Product>> addProduct(@RequestBody Product product) {
	        return ResponseEntity.status(201).body(productService.addProduct(product));
	    }

	    // GET ALL PRODUCTS
	    @GetMapping
	    public ResponseEntity<ResponseStructure<List<Product>>> getAllProducts() {
	        return ResponseEntity.ok(productService.getAllProducts());
	    }

	    // DELETE PRODUCT
	    @DeleteMapping("/{id}")
	    public ResponseEntity<ResponseStructure<String>> deleteProduct(@PathVariable Long id) {
	        return ResponseEntity.ok(productService.deleteProduct(id));
	    }
	    @GetMapping("/{id}")
	    public ResponseEntity<ResponseStructure<Product>> getProductById(@PathVariable Long id) {
	        return ResponseEntity.ok(productService.getProductById(id));
	    }
	    @PutMapping("/{id}")
	    public ResponseEntity<ResponseStructure<Product>> updateProduct(
	            @PathVariable Long id,
	            @RequestBody Product product) {

	        return ResponseEntity.ok(productService.updateProduct(id, product));
	    }

}
