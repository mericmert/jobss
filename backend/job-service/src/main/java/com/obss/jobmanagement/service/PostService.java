package com.obss.jobmanagement.service;


import com.obss.jobmanagement.cronjobs.ActivateJobPost;
import com.obss.jobmanagement.cronjobs.DisableJobPost;
import com.obss.jobmanagement.model.*;
import com.obss.jobmanagement.model.dto.PostDTO;
import com.obss.jobmanagement.repository.PostRepository;
import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.quartz.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class PostService {

    private final PostRepository postRepository;
    private final JobEventProducer jobEventProducer;
    private final Scheduler scheduler;

    public PostPage getPosts(Integer page, Integer size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Post> postPage = postRepository.findAll(pageable);
        Long rowCount = postPage.getTotalElements();
        Integer pageCount = postPage.getTotalPages();
        return new PostPage(postPage.stream().collect(Collectors.toList()), rowCount, pageCount);
    }

    public PostPage getAllPosts(){
        return new PostPage(postRepository.findAll(), postRepository.count(), 1);
    }

    public PostPage getPosts(Integer page, Integer size, String location, String eligibility, String sortBy, String level) {
        Specification<Post> spec = ((root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();
            if (location != null) {
                predicates.add(criteriaBuilder.or(
                        criteriaBuilder.like(criteriaBuilder.lower(root.get("city")), "%" + location.toLowerCase() + "%"),
                        criteriaBuilder.like(criteriaBuilder.lower(root.get("country")), "%" + location.toLowerCase() + "%")
                ));
            }
            if (eligibility != null) {
                predicates.add(criteriaBuilder.or(
                        criteriaBuilder.equal(root.get("eligibility"), Eligibility.REMOTE),
                        criteriaBuilder.equal(root.get("eligibility"), Eligibility.HYBRID)
                ));
            }
            if (level != null) {
                Level[] levels = Arrays.stream(level.split(","))
                        .map(lev -> Level.valueOf(lev.toUpperCase()))
                        .toArray(Level[]::new);

                predicates.add(root.get("level").in(Arrays.asList(levels)));

            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        });
        Pageable pageable;
        if (page != null && size != null) {
            if (sortBy != null && sortBy.equals("date")) {
                pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
            } else {
                pageable = PageRequest.of(page, size);
            }
        } else {
            if (sortBy != null && sortBy.equals("date")) {
                pageable = PageRequest.of(0, Integer.MAX_VALUE, Sort.by(Sort.Direction.DESC, "createdAt"));
            } else {
                pageable = PageRequest.of(0, Integer.MAX_VALUE);
            }
        }
        Page<Post> postPage = postRepository.findAll(spec, pageable);
        Long rowCount = postPage.getTotalElements();
        Integer pageCount = postPage.getTotalPages();
        return new PostPage(postPage.stream().collect(Collectors.toList()), rowCount, pageCount);

    }

    public Post getPost(Long id) throws NoSuchElementException {
        return postRepository.findById(id).orElseThrow();
    }

    public Post createPost(PostDTO postDTO) throws SchedulerException {
        Post newPost = Post.builder()
                .title(postDTO.getTitle())
                .description(postDTO.getDescription())
                .requiredSkills(postDTO.getRequiredSkills())
                .city(postDTO.getCity())
                .country(postDTO.getCountry())
                .eligibility(Eligibility.valueOf(postDTO.getEligibility()))
                .level(Level.valueOf(postDTO.getLevel()))
                .activationTime(postDTO.getActivationDate())
                .deadline(postDTO.getDeadline())
                .enabled(false)
                .build();

        Post savedPost = postRepository.save(newPost);
        jobEventProducer.emit(JobEvent.JOB_CREATED, savedPost.getId() + "|" + savedPost.getTitle());
        Date activationTime = new Date(postDTO.getActivationDate());
        Date deadlineTime = new Date(postDTO.getDeadline());
        scheduleActivation(savedPost.getId(), activationTime);
        scheduleDeadline(savedPost.getId(), deadlineTime);
        return savedPost;
    }

    public Post updatePost(Long id, PostDTO postDTO) throws NoSuchElementException {
        Post post = postRepository.findById(id)
                .orElseThrow();
        post.setTitle(postDTO.getTitle());
        post.setDescription(postDTO.getDescription());
        post.setEnabled(postDTO.isEnabled());
        post.setLevel(Level.valueOf(postDTO.getLevel()));
        post.setRequiredSkills(postDTO.getRequiredSkills());

        if (postDTO.getActivationDate() != null && postDTO.getDeadline() != null && postDTO.getDeadline() > new Date().getTime()){
            post.setActivationTime(postDTO.getActivationDate());
            post.setDeadline(postDTO.getDeadline());
            try {
                updateActivationSchedule(post.getId(), new Date(post.getActivationTime()));
                updateDeadlineSchedule( post.getId(), new Date(post.getDeadline()));
            } catch (SchedulerException e) {
                log.error(e.getMessage());
            }
        }
        Post updatedPost = postRepository.save(post);

        jobEventProducer.emit(JobEvent.JOB_UPDATED, updatedPost.getId() + "|" + updatedPost.getTitle());
        return updatedPost;
    }

    private void scheduleActivation(Long id, Date time) throws SchedulerException {
        JobDataMap jobDataMap = new JobDataMap();
        jobDataMap.put("id", id);
        JobDetail activateDetail = JobBuilder.newJob(ActivateJobPost.class)
                .withIdentity(id + "/activatePost")
                .usingJobData(jobDataMap)
                .build();

        Trigger activateTrigger = TriggerBuilder.newTrigger()
                .withIdentity(id + "/activatePostTrigger")
                .startAt(time)
                .build();

        scheduler.scheduleJob(activateDetail, activateTrigger);
    }

    private void scheduleDeadline(Long id, Date time) throws SchedulerException {
        JobDataMap jobDataMap = new JobDataMap();
        jobDataMap.put("id", id);
        JobDetail disableDetail = JobBuilder.newJob(DisableJobPost.class)
                .withIdentity(id + "/disablePost")
                .usingJobData(jobDataMap)
                .build();

        Trigger disableTrigger = TriggerBuilder.newTrigger()
                .withIdentity(id + "/disablePostTrigger")
                .startAt(time)
                .build();
        scheduler.scheduleJob(disableDetail, disableTrigger);
    }

    private void updateActivationSchedule(Long id, Date time) throws SchedulerException {
        JobKey jobKey = JobKey.jobKey(id + "/activationPost");
        if (scheduler.checkExists(jobKey)){
            scheduler.deleteJob(jobKey);
        }
        scheduleActivation(id, time);

    }

    private void updateDeadlineSchedule(Long id, Date time) throws SchedulerException {
        JobKey jobKey = JobKey.jobKey(id + "/disablePost");
        if (scheduler.checkExists(jobKey)){
            scheduler.deleteJob(jobKey);
        }

        scheduleDeadline(id, time);

    }


    public void deletePost(Long id) throws IllegalArgumentException {
        if (postRepository.existsById(id)) {
            postRepository.deleteById(id);
            jobEventProducer.emit(JobEvent.JOB_DELETED, id);
            return;
        }
        throw new IllegalArgumentException("Post ID is not found!");
    }



}
