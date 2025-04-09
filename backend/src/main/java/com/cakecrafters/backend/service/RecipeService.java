package com.cakecrafters.backend.service;

import com.cakecrafters.backend.config.WebConfig;
import com.cakecrafters.backend.entity.Recipe;
import com.cakecrafters.backend.repository.RecipeRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.nio.file.*;
import java.time.LocalDate;
import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class RecipeService {

    private final RecipeRepository recipeRepository;
    private final ObjectMapper objectMapper;

    public Recipe saveRecipe(String recipeJson, MultipartFile[] images) throws IOException {
        try {
            // Validate and parse JSON
            Recipe recipe = objectMapper.readValue(recipeJson, Recipe.class);
            validateRecipe(recipe);
            
            // Set default date
            recipe.setDate(LocalDate.now());

            // Process images only if provided
            if (images != null && images.length > 0) {
                List<String> imagePaths = handleFileUploads(images);
                recipe.setImagePaths(imagePaths);
            }

            return recipeRepository.save(recipe);
            
        } catch (Exception e) {
            log.error("Error saving recipe: ", e); // Enhanced logging
            throw new IOException("Data processing failed: " + e.getMessage(), e);
        }
    }

    private void validateRecipe(Recipe recipe) {
        if (recipe.getCakeName() == null || recipe.getCakeName().isEmpty()) {
            throw new IllegalArgumentException("Cake name is required");
        }
        if (recipe.getAuthorName() == null || recipe.getAuthorName().isEmpty()) {
            throw new IllegalArgumentException("Author name is required");
        }
    }

    private List<String> handleFileUploads(MultipartFile[] images) throws IOException {
        List<String> savedPaths = new ArrayList<>();
        Path uploadPath = WebConfig.getUploadPath();

        for (MultipartFile image : images) {
            if (!image.isEmpty()) {
                // Generate safe filename
                String originalFilename = Objects.requireNonNull(image.getOriginalFilename(), "Filename cannot be null");
                String sanitizedFilename = originalFilename.replaceAll("[^a-zA-Z0-9.-]", "_");
                String fileName = UUID.randomUUID() + "_" + sanitizedFilename;
                
                // Save file with retry
                Path targetPath = uploadPath.resolve(fileName);
                try {
                    Files.copy(image.getInputStream(), targetPath, StandardCopyOption.REPLACE_EXISTING);
                    savedPaths.add("/images/" + fileName);
                } catch (AccessDeniedException e) {
                    log.error("File permission error: ", e);
                    throw new IOException("File system access denied");
                }
            }
        }
        return savedPaths;
    }

    // Other service methods remain the same
}