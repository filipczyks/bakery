package com.somi.bakery.dto;

import lombok.Value;
import java.time.LocalDateTime;
import java.util.List;

@Value
public class OrderHistoryDto {
    String clientName;
    LocalDateTime createdAt;
    String rawOrderText;
    List<OrderItemDto> items;

    @Value
    public static class OrderItemDto {
        String name;
        int qty;
    }
} 