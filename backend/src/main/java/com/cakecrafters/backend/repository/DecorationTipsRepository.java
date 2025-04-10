package com.cakecrafters.backend.repository;

import com.cakecrafters.backend.entity.DecorationTip;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DecorationTipsRepository extends JpaRepository<DecorationTip, Long> {
}