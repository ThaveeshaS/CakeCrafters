package com.cakecrafters.backend.service;

import com.cakecrafters.backend.entity.Post;
import com.cakecrafters.backend.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostService {
    @Autowired
    private PostRepository postRepository;

    public Post createPost(Post post) {
        return postRepository.save(post);
    }

    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    public Post getPostById(Long id) {
        return postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found with id: " + id));
    }

    public Post updatePost(Long id, Post post) {
        Post existingPost = getPostById(id);
        existingPost.setDescription(post.getDescription());
        existingPost.setMediaUrls(post.getMediaUrls());
        // Optionally update other fields if needed
        return postRepository.save(existingPost);
    }

    public void deletePost(Long id) {
        Post post = getPostById(id);
        postRepository.delete(post);
    }
}