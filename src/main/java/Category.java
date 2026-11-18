package com.shopsphere.entity;

import lombok.Data;

@Entity
@Data

public class Category {
	    @Id
	    @GeneratedValuem(strategy = GenerationType.IDENTITY)
	    private Long id;

	    private String name;

	    private String description;

}
