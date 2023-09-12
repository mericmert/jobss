package org.mericbulca.service;

import lombok.RequiredArgsConstructor;
import org.mericbulca.model.JobProjection;
import org.mericbulca.repository.JobRepository;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class JobService {

    private final JobRepository jobRepository;
    private final ApplicationService applicationService;

    public JobService(JobRepository jobRepository, @Lazy ApplicationService applicationService) {
        this.jobRepository = jobRepository;
        this.applicationService = applicationService;
    }

    public void createJob(Long jobId, String title){
        JobProjection job_post = JobProjection.builder()
                .id(jobId)
                .job_title(title)
                .build();
        jobRepository.save(job_post);

    }

    public void updateJob(Long jobId, String title){
        JobProjection job_post = jobRepository.findById(jobId).orElseThrow();
        job_post.setJob_title(title);
        jobRepository.save(job_post);
    }

    public void deleteJob(Long jobId){
        jobRepository.deleteById(jobId);
        applicationService.deleteAllByJobId(jobId);
    }


    public JobProjection findById(Long postId) {
        return jobRepository.findById(postId).orElse(null);
    }
}
