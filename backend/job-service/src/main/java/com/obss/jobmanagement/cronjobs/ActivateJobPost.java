package com.obss.jobmanagement.cronjobs;

import com.obss.jobmanagement.model.Post;
import com.obss.jobmanagement.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.quartz.JobDataMap;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.quartz.QuartzJobBean;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class ActivateJobPost extends QuartzJobBean {


    private PostRepository postRepository;

    public ActivateJobPost() {
    }

    @Autowired
    public void setPostRepository(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    @Override
    protected void executeInternal(JobExecutionContext context) throws JobExecutionException {
        log.info("Activation cronjob is executed!");
        JobDataMap jobDataMap = context.getJobDetail().getJobDataMap();
        long jobId = jobDataMap.getLong("id");
        Post post = postRepository.findById(jobId).orElseThrow();
        post.setEnabled(true);
        postRepository.save(post);
    }

}
