package com.shopsphere.controller;

import com.shopsphere.entity.*;
import com.shopsphere.repository.*;

import org.springframework.web.bind.annotation.*;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:5173")
public class OrderController {

    private final OrderRepository orderRepository;
    private final OrderItemRepository itemRepository;
    private final CartRepository cartRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    public OrderController(
            OrderRepository orderRepository,
            OrderItemRepository itemRepository,
            CartRepository cartRepository,
            UserRepository userRepository,
            ProductRepository productRepository) {

        this.orderRepository = orderRepository;
        this.itemRepository = itemRepository;
        this.cartRepository = cartRepository;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
    }

    // Place order
    @PostMapping("/{userId}")
    @Transactional
    public Order placeOrder(@PathVariable Long userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<CartItem> cart = cartRepository.findByUserId(userId);

        if (cart.isEmpty()) {
            throw new RuntimeException("Cart is empty");
        }

        BigDecimal total = BigDecimal.ZERO;

        for (CartItem cartItem : cart) {
            Product product = productRepository.findById(
                    cartItem.getProduct().getId())
                    .orElseThrow(() -> new RuntimeException("Product not found"));

            if (cartItem.getQuantity() <= 0 ||
                    product.getStock() < cartItem.getQuantity()) {
                throw new RuntimeException("Insufficient stock");
            }

            total = total.add(
                    product.getPrice().multiply(
                            BigDecimal.valueOf(cartItem.getQuantity())
                    )
            );
        }
     // Display order history
        @GetMapping("/history/{userId}")
        public List<Order> getOrderHistory(
                @PathVariable Long userId) {

            return orderRepository.findByUserId(userId);
        }

        Order order = new Order();
        order.setUser(user);
        order.setTotalAmount(total);
        order.setStatus("PLACED");
        order.setOrderDate(LocalDateTime.now());

        order = orderRepository.save(order);

        for (CartItem cartItem : cart) {

            Product product = productRepository.findById(
                    cartItem.getProduct().getId())
                    .orElseThrow();

            OrderItem item = new OrderItem();
            item.setOrder(order);
            item.setProduct(product);
            item.setQuantity(cartItem.getQuantity());
            item.setPrice(product.getPrice());

            itemRepository.save(item);

            product.setStock(
                    product.getStock() - cartItem.getQuantity());

            productRepository.save(product);
        }

        cartRepository.deleteAll(cart);

        return order;
    }
}