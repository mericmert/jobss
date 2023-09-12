package com.mericbulca.searchservice.controller;

import com.mericbulca.searchservice.model.PostDocument;
import com.mericbulca.searchservice.service.SearchService;
import jakarta.ws.rs.QueryParam;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/search")
@RequiredArgsConstructor
public class SearchController {

    private final SearchService searchService;

    @GetMapping
    public ResponseEntity<Map<String, ?>> searchPosts(@RequestParam String query) {
        return ResponseEntity.ok(searchService.search(query));

    }
}
