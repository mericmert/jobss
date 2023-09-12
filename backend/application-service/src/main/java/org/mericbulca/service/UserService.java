package org.mericbulca.service;

import org.mericbulca.model.UserProjection;
import org.mericbulca.repository.UserRepository;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;


@Service
public class UserService {

    private final UserRepository userRepository;
    private final ApplicationService applicationService;

    public UserService(UserRepository userRepository, @Lazy ApplicationService applicationService) {
        this.userRepository = userRepository;
        this.applicationService = applicationService;
    }

    public void createUser(Long userId, String email) {
        UserProjection user = UserProjection.builder()
                                .id(userId)
                                .email(email)
                                .blacklisted(false)
                                .build();
        userRepository.save(user);
    }
    public void updateUser(Long userId, String isBlacklisted){
        UserProjection user = userRepository.findById(userId).orElseThrow();
        user.setId(userId);
        user.setBlacklisted(Boolean.parseBoolean(isBlacklisted));
        userRepository.save(user);
    }

    public void deleteUser(Long userId) {
        userRepository.deleteById(userId);
        applicationService.deleteAllByUserId(userId);
    }

    public UserProjection findById(Long userId) {
        return userRepository.findById(userId).orElse(null);
    }
}
