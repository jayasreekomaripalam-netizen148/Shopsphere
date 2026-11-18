package com.shopsphere.entity;
import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;

@Entity
@Data

public class Product {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String description;

    private BigDecimal price;

    private String image;

    private Integer stock;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

}
