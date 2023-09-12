package org.mericbulca.listener;

import lombok.RequiredArgsConstructor;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.mericbulca.exception.InvalidEventException;
import org.mericbulca.service.JobService;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class JobEventListener {

    private final JobService jobService;

    @KafkaListener(topics = "jobs", groupId = "job_listener")
    public void listenJobEvents(ConsumerRecord<String, String> record){
        String event = record.key();
        String[] jobInfo = record.value().split("\\|");
        Long jobId = Long.parseLong(jobInfo[0]);
        switch (event) {
            case "JOB_CREATED" -> jobService.createJob(jobId, jobInfo[1]);
            case "JOB_UPDATED" -> jobService.updateJob(jobId, jobInfo[1]);
            case "JOB_DELETED" -> jobService.deleteJob(jobId);
            default -> throw new InvalidEventException("Invalid event!");
        }
    }





}
