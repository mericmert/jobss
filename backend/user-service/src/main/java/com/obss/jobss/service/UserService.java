package com.obss.jobss.service;

import com.obss.jobss.model.*;
import com.obss.jobss.repository.UserRepository;
import com.obss.jobss.service.UserEventProducer;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserEventProducer userEventProducer;

    public boolean isExistByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    public User createAccount(Account account) {
        User user = User.builder()
                .role(Role.USER)
                .username(account.getEmail())
                .full_name(account.getFull_name())
                .email(account.getEmail())
                .enabled(true)
                .blacklisted(false)
                .picture(account.getPicture())
                .build();
        User savedUser = userRepository.save(user);
        userEventProducer.emit(UserEvent.USER_CREATED, savedUser.getId() + "|" + savedUser.getEmail());
        return savedUser;
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email).orElseThrow();
    }

    public List<UserDTO> getUsers() {
        List<User> users = userRepository.findAll();
        return users.stream().map(UserDTO::fromEntity).collect(Collectors.toList());
    }

    public UserDTO blacklist(UserDTO userDTO) {
        User user = userRepository.findById(userDTO.getId()).orElseThrow();
        user.setBlacklisted(userDTO.isBlacklisted());
        User newUser = userRepository.save(user);
        userEventProducer.emit(UserEvent.USER_UPDATED, newUser.getId() + "|" + userDTO.isBlacklisted());
        return UserDTO.fromEntity(newUser);
    }
}
