package com.shopsphere.controller;

import com.shopsphere.entity.Category;
import com.shopsphere.repository.CategoryRepository;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin(origins = "http://localhost:5173")
public class CategoryController {

    private final CategoryRepository repository;

    public CategoryController(CategoryRepository repository) {
        this.repository = repository;
    }

    // Display all categories
    @GetMapping
    public List<Category> getCategories() {
        return repository.findAll();
    }

    // Add category
    @PostMapping
    public Category addCategory(@RequestBody Category category) {
        return repository.save(category);
    }
}