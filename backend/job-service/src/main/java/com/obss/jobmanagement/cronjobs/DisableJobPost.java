package com.obss.jobmanagement.cronjobs;

import com.obss.jobmanagement.model.Post;
import com.obss.jobmanagement.repository.PostRepository;
import lombok.extern.slf4j.Slf4j;
import org.quartz.JobDataMap;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.quartz.QuartzJobBean;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class DisableJobPost extends QuartzJobBean {

    private  PostRepository postRepository;

    public DisableJobPost() {
    }

    @Autowired
    public void setPostRepository(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    @Override
    protected void executeInternal(JobExecutionContext context) throws JobExecutionException {
        log.info("Disable cronjob is executed!");
        JobDataMap jobDataMap = context.getJobDetail().getJobDataMap();
        long jobId = jobDataMap.getLong("id");
        Post post = postRepository.findById(jobId).orElseThrow();
        post.setEnabled(false);
        postRepository.save(post);
    }

}
