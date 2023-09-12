package org.mericbulca.listener;

import lombok.RequiredArgsConstructor;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.mericbulca.exception.InvalidEventException;
import org.mericbulca.service.UserService;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserEventListener {

    private final UserService userService;

    @KafkaListener(topics = "users", groupId = "user_listener")
    public void listenUserEvents(ConsumerRecord<String, String> record){
        String event = record.key();
        String[] userInfo = record.value().split("\\|");
        Long userId = Long.parseLong(userInfo[0]);
        switch (event) {
            case "USER_CREATED" -> userService.createUser(userId, userInfo[1]);
            case "USER_UPDATED" -> userService.updateUser(userId, userInfo[1]);
            case "USER_DELETED" -> userService.deleteUser(userId);
            default -> throw new InvalidEventException("Invalid event!");
        }
    }



}
