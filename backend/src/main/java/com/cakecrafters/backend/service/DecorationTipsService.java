package com.cakecrafters.backend.service;

import com.cakecrafters.backend.entity.DecorationTip;
import com.cakecrafters.backend.repository.DecorationTipsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class DecorationTipsService {

    @Autowired
    private DecorationTipsRepository decorationTipsRepository;

    @Transactional
    public DecorationTip createDecorationTip(DecorationTip decorationTip) {
        decorationTip.setCreatedAt(LocalDateTime.now()); // Set creation timestamp
        return decorationTipsRepository.save(decorationTip);
    }

    public List<DecorationTip> getAllDecorationTips() {
        return decorationTipsRepository.findAll();
    }

    public DecorationTip getDecorationTipById(Long id) {
        return decorationTipsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Decoration tip not found with id: " + id));
    }

    @Transactional
    public DecorationTip updateDecorationTip(Long id, DecorationTip decorationTip) {
        DecorationTip existingTip = getDecorationTipById(id);
        existingTip.setTitle(decorationTip.getTitle());
        existingTip.setDescription(decorationTip.getDescription());
        existingTip.setCategory(decorationTip.getCategory());
        existingTip.setDifficulty(decorationTip.getDifficulty());
        existingTip.setMediaUrls(decorationTip.getMediaUrls());
        existingTip.setAuthor(decorationTip.getAuthor());
        // createdAt remains unchanged
        return decorationTipsRepository.save(existingTip);
    }

    @Transactional
    public void deleteDecorationTip(Long id) {
        DecorationTip tip = getDecorationTipById(id);
        decorationTipsRepository.delete(tip);
    }
}