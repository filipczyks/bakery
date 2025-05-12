package com.somi.bakery.controller;

import com.somi.bakery.dto.OrderHistoryDto;
import com.somi.bakery.dto.ProductSummary;
import com.somi.bakery.service.OrderService;
import com.somi.bakery.dto.OrderRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/orders")
public class OrderController {
    private final OrderService orderService;
    public OrderController(OrderService orderService) { this.orderService = orderService; }

    @PostMapping
    public ResponseEntity<?> createOrder(@RequestBody OrderRequest request) {
        try {
            orderService.createOrder(request.getClientName(), request.getOrderText());
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/today")
    public List<ProductSummary> getTodaySummary() {
        return orderService.getTodaySummary();
    }

    @GetMapping("/history")
    public List<OrderHistoryDto> getHistory() {
        return orderService.getHistory();
    }
} 