package com.mericbulca.mailservice.listener;

import com.mericbulca.mailservice.model.NotificationEvent;
import com.mericbulca.mailservice.service.MailService;
import lombok.RequiredArgsConstructor;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class NotificationEventListener {

    private final MailService mailService;

    @KafkaListener(topics = "notifications", groupId = "notification_listener")
    public void listenNotificationEvents(ConsumerRecord<String, String> record){
        NotificationEvent event = NotificationEvent.valueOf(record.key());
        switch (event) {
            case USER_NOTIFICATION -> {
                String[] payload = record.value().split("\\|");
                String email = payload[0];
                String bodyText = payload[1];
                mailService.sendMail(email, "Jobss", bodyText);
            }
            default -> throw new RuntimeException("Wrong event!");
        }
    }

}
