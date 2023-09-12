package org.mericbulca.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.mericbulca.model.NotificationEvent;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class NotificationEventProducer {

    private final KafkaTemplate<String, String> kafkaTemplate;
    private final static String TOPIC = "notifications";

    public void sendNotificationToUser(String userMail, String data) {
        log.info(String.format("#### -> Producing message -> %s", NotificationEvent.USER_NOTIFICATION));
        kafkaTemplate.send(TOPIC, NotificationEvent.USER_NOTIFICATION.name(), userMail + "|" + data);
    }

    public void sendNotification(String data){
        log.info(String.format("#### -> Producing message -> %s", NotificationEvent.GENERAL_NOTIFICATION));
        kafkaTemplate.send(TOPIC, NotificationEvent.GENERAL_NOTIFICATION.name(), data);
    }


}
