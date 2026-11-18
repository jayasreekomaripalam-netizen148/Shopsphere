package com.shopsphere.controller;

import com.shopsphere.entity.*;
import com.shopsphere.repository.*;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/wishlist")
@CrossOrigin(origins = "http://localhost:5173")
public class WishlistController {

    private final WishlistRepository wishlistRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    public WishlistController(
            WishlistRepository wishlistRepository,
            UserRepository userRepository,
            ProductRepository productRepository) {

        this.wishlistRepository = wishlistRepository;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
    }

    // Display wishlist
    @GetMapping("/{userId}")
    public List<WishlistItem> getWishlist(
            @PathVariable Long userId) {

        return wishlistRepository.findByUserId(userId);
    }

    // Add product to wishlist
    @PostMapping("/{userId}/{productId}")
    public WishlistItem addWishlist(
            @PathVariable Long userId,
            @PathVariable Long productId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        WishlistItem item = new WishlistItem();
        item.setUser(user);
        item.setProduct(product);

        return wishlistRepository.save(item);
    }

    // Remove wishlist item
    @DeleteMapping("/{id}")
    public String removeWishlist(@PathVariable Long id) {

        wishlistRepository.deleteById(id);

        return "Removed from wishlist";
    }
}