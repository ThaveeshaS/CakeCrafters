package com.cakecrafters.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "decoration_tip")
@Data
public class DecorationTip {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String description;

    private String category;

    private String difficulty;

    @ElementCollection
    @CollectionTable(name = "decoration_tip_media_urls", joinColumns = @JoinColumn(name = "decoration_tip_id"))
    @Column(name = "media_urls")
    @OrderColumn(name = "media_url_order")
    private List<String> mediaUrls = new ArrayList<>();

    private String author;

    private LocalDateTime createdAt;

    // Optionally add fields for likes and comments in the future
}