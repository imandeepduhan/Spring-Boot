package com.mandeep.path.services.impl;

import com.mandeep.path.dtos.UserDto;
import com.mandeep.path.services.AuthService;
import com.mandeep.path.services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@AllArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserService userService;
    @Override
    public UserDto registerUser(UserDto userDto) {
        // logic
        // verify email
        // verify password
        // default roles
        UserDto userDto1 = userService.createUser(userDto);
        return userDto1;
    }
}
