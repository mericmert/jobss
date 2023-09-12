package org.mericbulca.controller;

import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.mericbulca.exception.BlacklistException;
import org.mericbulca.model.Application;
import org.mericbulca.model.dto.ApplicationRequest;
import org.mericbulca.model.dto.ApplicationUpdateRequest;
import org.mericbulca.service.ApplicationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import lombok.RequiredArgsConstructor;

import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/v1/applications")
@RequiredArgsConstructor
@Slf4j
public class ApplicationController {

    private final ApplicationService applicationService;

    @GetMapping("/")
    public ResponseEntity<List<Application>> getApplications(
            @RequestParam(required = false) Long user_id,
            @RequestParam(required = false) Long post_id

    ){
        if (user_id != null) {
            return ResponseEntity.ok(applicationService.getApplicationsByUser(user_id));
        }
        if (post_id != null) {
            return ResponseEntity.ok(applicationService.getApplicationsByPost(post_id));
        }
        return ResponseEntity.ok(applicationService.getApplications());

    }

    @GetMapping("/{id}")
    public ResponseEntity<Application> getApplication(@PathVariable Long id){
        return ResponseEntity.ok(applicationService.getApplication(id));
    }

    @PostMapping("/")
    public ResponseEntity<Application> createApplication(@RequestBody ApplicationRequest req){
        try{
            return ResponseEntity.ok(applicationService.createApplication(req));
        } catch (BlacklistException exception) {
            return ResponseEntity.status(409).build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Application> updateApplication(
            @PathVariable Long id,
            @Valid @RequestBody ApplicationUpdateRequest updateReq)
    {
        try{
            Application updatedApplication = applicationService.updateApplication(id, updateReq);
            return new ResponseEntity<>(updatedApplication, HttpStatus.OK);
        } catch (NoSuchElementException exception){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteApplication(@PathVariable Long id){
        try{
            applicationService.deleteApplication(id);
            return ResponseEntity.ok("Application has been successfully deleted!");
        } catch (IllegalArgumentException exception){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(exception.getMessage());
        } catch (Exception exception){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/users/{user_id}")
    public ResponseEntity<String> deleteApplicationsByUser( @PathVariable Long user_id){
        try{
            applicationService.deleteApplicationsByUser(user_id);
            return ResponseEntity.ok("Applications have been successfully deleted!");
        } catch (IllegalArgumentException exception){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(exception.getMessage());
        } catch (Exception exception){
            log.error(exception.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }




}
