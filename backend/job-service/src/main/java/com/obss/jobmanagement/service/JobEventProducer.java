package com.obss.jobmanagement.service;

import com.obss.jobmanagement.model.JobEvent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class JobEventProducer {

    private final KafkaTemplate<String, String> kafkaTemplate;
    private final static String TOPIC = "jobs";


    public void emit(JobEvent event, Long jobId){
        log.info(String.format("#### -> Producing message -> %s", event.name()));
        kafkaTemplate.send(TOPIC, event.name(), String.valueOf(jobId));
    }

    public void emit(String topic, JobEvent event, Long jobId){
        log.info(String.format("#### -> Producing message -> %s", event.name()));
        kafkaTemplate.send(topic, event.name(), String.valueOf(jobId));
    }

    public void emit(JobEvent event, String jobInfo){
        log.info(String.format("#### -> Producing message -> %s", event.name()));
        kafkaTemplate.send(TOPIC, event.name(), jobInfo);
    }
}
