package com.obss.jobmanagement.controller;

import com.obss.jobmanagement.model.Post;
import com.obss.jobmanagement.model.PostPage;
import com.obss.jobmanagement.model.dto.PostDTO;
import com.obss.jobmanagement.service.PostService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.quartz.SchedulerException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/v1/jobs/posts")
@RequiredArgsConstructor
@Slf4j
public class PostController {

    private final PostService postService;

    @GetMapping("/")
    public ResponseEntity<PostPage> getPosts(
            @RequestParam(required = false) String location,
            @RequestParam(required = false) String eligibility,
            @RequestParam(required = false) String sortBy,
            @RequestParam(required = false) String level,
            @RequestParam(required = false) Integer page,
            @RequestParam(required = false) Integer size
    ) {
        if (location == null && eligibility == null && sortBy == null && level == null) {
            if (page != null && size != null){
                return ResponseEntity.ok(postService.getPosts(page, size));
            }
            return ResponseEntity.ok(postService.getAllPosts());
        }
        return ResponseEntity.ok(postService.getPosts(page, size, location, eligibility, sortBy, level));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Post> getPost(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(postService.getPost(id));
        } catch (NoSuchElementException exception) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @PostMapping("/")
    public ResponseEntity<Post> createPost(@Valid @RequestBody PostDTO postDTO) {
        Post createdPost = null;
        try {
            createdPost = postService.createPost(postDTO);
        } catch (SchedulerException e) {
            log.error(e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
        return new ResponseEntity<>(createdPost, HttpStatus.CREATED);
    }


    @PutMapping("/{id}")
    public ResponseEntity<Post> updatePost(@PathVariable Long id, @Valid @RequestBody PostDTO postDTO) {
        try {
            Post updatedPost = postService.updatePost(id, postDTO);
            return ResponseEntity.ok(updatedPost);
        } catch (NoSuchElementException exception) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePost(@PathVariable Long id) {
        try {
            postService.deletePost(id);
            return ResponseEntity.ok("Job post has been successfully deleted!");
        } catch (IllegalArgumentException exception) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(exception.getMessage());
        } catch (Exception exception) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


}
