package com.shopsphere.controller;

import com.shopsphere.entity.Product;
import com.shopsphere.repository.ProductRepository;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:5173")
public class ProductController {

    private final ProductRepository repository;

    public ProductController(ProductRepository repository) {
        this.repository = repository;
    }

    // All products
    @GetMapping
    public List<Product> getProducts() {
        return repository.findAll();
    }

    // Single product details
    @GetMapping("/{id}")
    public Product getProduct(@PathVariable Long id) {
        return repository.findById(id)
                .orElseThrow(() ->
                    new RuntimeException("Product not found"));
    }

    // Products by category
    @GetMapping("/category/{categoryId}")
    public List<Product> getByCategory(
            @PathVariable Long categoryId) {

        return repository.findByCategoryId(categoryId);
    }
}