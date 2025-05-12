package com.somi.bakery.service;

import com.somi.bakery.domain.*;
import com.somi.bakery.repository.*;
import com.somi.bakery.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.regex.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;

    @Transactional
    public void createOrder(String clientName, String orderText) {
        Order order = new Order(clientName, orderText);

        List<OrderLine> lines = parseOrderText(orderText);

        for (OrderLine line : lines) {
            Product product = findOrCreateProduct(line.productName());
            OrderItem item = new OrderItem(product, order, line.quantity());
            order.addItem(item);
        }

        orderRepository.save(order);
    }

    public List<ProductSummary> getTodaySummary() {
        LocalDateTime startOfDay = LocalDate.now().atStartOfDay();
        LocalDateTime endOfDay = startOfDay.plusDays(1);

        // Pobierz zamówienia z dzisiaj
        List<Order> todaysOrders = orderRepository.findAllByCreatedAtBetween(startOfDay, endOfDay);

        // Zgrupuj po produktach i zsumuj ilości
        Map<String, Integer> grouped = new HashMap<>();
        for (Order order : todaysOrders) {
            for (OrderItem item : order.getItems()) {
                grouped.merge(
                    item.getProduct().getName(),
                    item.getQuantity(),
                    Integer::sum
                );
            }
        }

        // Zamień na listę DTO
        return grouped.entrySet().stream()
                .map(e -> new ProductSummary(e.getKey(), e.getValue()))
                .sorted(Comparator.comparing(ProductSummary::getName))
                .collect(Collectors.toList());
    }

    public List<OrderHistoryDto> getHistory() {
        return orderRepository.findAllByOrderByCreatedAtDesc().stream()
                .map(order -> new OrderHistoryDto(
                        order.getClientName(),
                        order.getCreatedAt(),
                        order.getRawOrderText(),
                        order.getItems().stream()
                                .map(item -> new OrderHistoryDto.OrderItemDto(
                                        item.getProduct().getName(),
                                        item.getQuantity()
                                ))
                                .collect(Collectors.toList())
                ))
                .collect(Collectors.toList());
    }

    private List<OrderLine> parseOrderText(String orderText) {
        return Arrays.stream(orderText.split("\n"))
                .map(String::trim)
                .filter(line -> !line.isEmpty())
                .map(this::parseLine)
                .collect(Collectors.toList());
    }

    private OrderLine parseLine(String line) {
        Pattern pattern = Pattern.compile("^(.+?)\\s*x\\s*(\\d+)$");
        Matcher matcher = pattern.matcher(line);
        if (!matcher.matches()) {
            throw new IllegalArgumentException("Nieprawidłowy format linii: " + line);
        }
        String productName = matcher.group(1).trim();
        int quantity = Integer.parseInt(matcher.group(2));
        return new OrderLine(productName, quantity);
    }

    private Product findOrCreateProduct(String productName) {
        return productRepository.findByName(productName)
                .orElseGet(() -> productRepository.save(new Product(productName)));
    }

    // DTO do wewnętrznego użytku
    private record OrderLine(String productName, int quantity) {}
} 