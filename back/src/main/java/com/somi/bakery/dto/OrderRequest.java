package com.somi.bakery.dto;

import lombok.Data;

@Data
public class OrderRequest {
    private String clientName;
    private String orderText;
} 