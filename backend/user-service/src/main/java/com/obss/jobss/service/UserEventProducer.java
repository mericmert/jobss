package com.obss.jobss.service;

import com.obss.jobss.model.UserEvent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserEventProducer {

    private final KafkaTemplate<String, String> kafkaTemplate;
    private final static String TOPIC = "users";

    public void emit(UserEvent event, String userInfo){
        log.info(String.format("#### -> Producing message -> %s", event.name()));
        kafkaTemplate.send(TOPIC, event.name(), userInfo);
    }


}
