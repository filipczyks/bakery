package com.somi.bakery.repository;

import com.somi.bakery.domain.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDateTime;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findAllByCreatedAtBetween(LocalDateTime from, LocalDateTime to);
    List<Order> findAllByOrderByCreatedAtDesc();
} 