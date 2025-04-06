package com.cakecrafters.backend.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "post")
@Data
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime createdAt;

    private String description;

    @ElementCollection
    @CollectionTable(name = "post_media_urls", joinColumns = @JoinColumn(name = "post_id"))
    @Column(name = "media_urls")
    @OrderColumn(name = "media_url_order")
    private List<String> mediaUrls = new ArrayList<>();

    @ManyToOne
    private User user;

    @OneToMany(mappedBy = "post")
    @JsonManagedReference
    private List<Comment> comments = new ArrayList<>();

    @OneToMany(mappedBy = "post")
    @JsonManagedReference
    private List<PostLike> likes = new ArrayList<>();
}