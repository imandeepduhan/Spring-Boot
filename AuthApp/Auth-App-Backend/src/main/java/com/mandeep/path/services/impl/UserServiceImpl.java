package com.mandeep.path.services.impl;

import com.mandeep.path.dtos.UserDto;
import com.mandeep.path.entities.Provider;
import com.mandeep.path.entities.User;
import com.mandeep.path.exceptions.ResourceNotFoundException;
import com.mandeep.path.helpers.UserHelper;
import com.mandeep.path.repositories.UserRepository;
import com.mandeep.path.services.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.UUID;

@Service
@RequiredArgsConstructor

public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    @Override
    @Transactional
    public UserDto createUser(UserDto userDto) {
        if(userDto.getEmail() == null || userDto.getEmail().isBlank()) {
            throw new IllegalArgumentException("Email is required");
        }
        if(userRepository.existsByEmail(userDto.getEmail())) {
            throw new IllegalArgumentException("User with given email already exists");
        }

        // if you have extra checks ___put here ___

        User user = modelMapper.map(userDto, User.class);
        user.setProvider(userDto.getProvider()!=null ? userDto.getProvider() : Provider.LOCAL);
        // role assign here to new user___ for authorization
        // TODO;
        User savedUser = userRepository.save(user);
        return modelMapper.map(savedUser, UserDto.class);
    }

    @Override
    public UserDto getUserByEmail(String email) {
        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with given email id "));

        return modelMapper.map(user, UserDto.class);
    }

    @Override
    public UserDto updateUser(UserDto userDto, String userId) {
        UUID uId = UserHelper.parseUUID(userId);
        User existingUser = userRepository
                .findById(uId)
                .orElseThrow(()-> new ResourceNotFoundException("User not found with given id"));
        // we are not going to change email id for this project.
        if(userDto.getName() != null) existingUser.setName(userDto.getName());
        if(userDto.getImage() != null) existingUser.setImage(userDto.getImage());
        if(userDto.getProvider() != null) existingUser.setProvider(userDto.getProvider());
        // TODO change password update logic...
        if(userDto.getPassword() != null) existingUser.setPassword(userDto.getPassword());
        existingUser.setEnable(userDto.isEnable());
        existingUser.setUpdatedAt(Instant.now());
        User updatedUser = userRepository.save(existingUser);

        return modelMapper.map(updatedUser, UserDto.class);
    }

    @Override
    public void deleteUser(String userId) {
        UUID uId = UserHelper.parseUUID(userId);
        User user = userRepository.findById(uId).orElseThrow(() -> new ResourceNotFoundException("User not found with given id"));
        userRepository.delete(user);
    }

    @Override
    public UserDto getUserById(String userId) {
        User user = userRepository.findById(UserHelper.parseUUID(userId)).orElseThrow(()-> new ResourceNotFoundException("User not found with given id"));
        return modelMapper.map(user, UserDto.class);
    }

    @Override
    @Transactional
    public Iterable<UserDto> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(user -> modelMapper.map(user, UserDto.class))
                .toList();
    }
}
