package org.mericbulca.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.mericbulca.exception.BlacklistException;
import org.mericbulca.model.Application;
import org.mericbulca.model.JobProjection;
import org.mericbulca.model.Status;
import org.mericbulca.model.UserProjection;
import org.mericbulca.model.dto.ApplicationRequest;
import org.mericbulca.model.dto.ApplicationUpdateRequest;
import org.mericbulca.repository.ApplicationRepository;
import org.springframework.stereotype.Service;

import java.security.InvalidParameterException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final UserService userService;
    private final JobService jobService;
    private final NotificationEventProducer notificationEventProducer;
    public List<Application> getApplications() {
        return applicationRepository.findAll();
    }

    public Application getApplication(Long id) {
        return applicationRepository.findById(id).orElseThrow();
    }

    public Application createApplication(ApplicationRequest req) {
        UserProjection user = userService.findById(req.getUser_id());
        JobProjection post = jobService.findById(req.getPost_id());
        if (user != null && post != null){
            if (user.isBlacklisted()){
                throw new BlacklistException("Blacklist Exception!");
            }
            Application newApplication = Application.builder()
                    .user(user)
                    .jobPost(post)
                    .fullName(req.getFull_name())
                    .major(req.getMajor())
                    .school(req.getSchool())
                    .coverLetter(req.getCover_letter())
                    .status(Status.PENDING)
                    .enabled(true)
                    .build();
            return applicationRepository.save(newApplication);
        }
        throw new InvalidParameterException("Invalid post_id or user_id!");
    }

    public Application updateApplication(Long id, ApplicationUpdateRequest req) {
        boolean isStatusChanged = false;
        Application application = applicationRepository.findById(id).orElseThrow();
        if (req.getMajor() != null) {
            application.setMajor(req.getMajor());
        }
        if (req.getSchool() != null){
            application.setSchool(req.getSchool());
        }
        if (req.getMajor() != null) {
            application.setMajor(req.getMajor());
        }
        if (req.getCover_letter() != null) {
            application.setCoverLetter(req.getCover_letter());
        }
        if (req.getStatus() != null && !application.getStatus().name().equals(req.getStatus()) ) {
            application.setStatus(Status.valueOf(req.getStatus()));
            isStatusChanged = true;
        }
        Application savedApplication = applicationRepository.save(application);
        if (isStatusChanged) {
            notificationEventProducer.sendNotificationToUser(savedApplication.getUser().getEmail(),
                    "Your application status has been updated: " + savedApplication.getStatus());
        }
        return savedApplication;

    }

    public void deleteApplication(Long id) {

        if (applicationRepository.existsById(id)) {
            applicationRepository.deleteById(id);
            return;
        }
        throw new IllegalArgumentException("Application ID is not found!");
    }

    public void deleteAllByUserId(Long userId) {
        applicationRepository.deleteAllByUser_Id(userId);
    }

    public void deleteAllByJobId(Long jobId) {
        applicationRepository.deleteAllByJobPost_Id(jobId);
    }

    public List<Application> getApplicationsByUser(Long userId) {
        return applicationRepository.findAllByUser_Id(userId);
    }

    public List<Application> getApplicationsByPost(Long postId) {
        return applicationRepository.findAllByJobPost_Id(postId);
    }

    @Transactional
    public void deleteApplicationsByUser(Long userId) {
        applicationRepository.deleteAllByUser_Id(userId);
    }
}
