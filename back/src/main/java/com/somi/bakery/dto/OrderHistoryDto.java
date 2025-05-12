package com.somi.bakery.dto;

import lombok.Value;
import java.time.LocalDateTime;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonFormat;

@Value
public class OrderHistoryDto {
    String clientName;
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    LocalDateTime createdAt;
    String rawOrderText;
    List<OrderItemDto> items;

    @Value
    public static class OrderItemDto {
        String name;
        int qty;
    }
} 