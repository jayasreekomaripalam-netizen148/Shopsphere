package com.shopsphere.controller;

import com.shopsphere.entity.*;
import com.shopsphere.repository.*;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "http://localhost:5173")
public class CartController {

    private final CartRepository cartRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    public CartController(
            CartRepository cartRepository,
            UserRepository userRepository,
            ProductRepository productRepository) {

        this.cartRepository = cartRepository;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
    }

    // Display cart
    @GetMapping("/{userId}")
    public List<CartItem> getCart(@PathVariable Long userId) {
        return cartRepository.findByUserId(userId);
    }

    // Add product to cart
    @PostMapping("/{userId}/{productId}")
    public CartItem addToCart(
            @PathVariable Long userId,
            @PathVariable Long productId,
            @RequestParam(defaultValue = "1") Integer quantity) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        if (quantity <= 0 || product.getStock() < quantity) {
            throw new RuntimeException("Invalid quantity or insufficient stock");
        }

        CartItem item = new CartItem();
        item.setUser(user);
        item.setProduct(product);
        item.setQuantity(quantity);

        return cartRepository.save(item);
    }

    // Remove cart item
    @DeleteMapping("/remove/{id}")
    public String removeItem(@PathVariable Long id) {
        cartRepository.deleteById(id);
        return "Product removed from cart";
    }
}