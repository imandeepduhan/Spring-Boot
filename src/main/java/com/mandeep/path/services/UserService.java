package com.mandeep.path.services;

import com.mandeep.path.dtos.UserDto;
import com.mandeep.path.entities.User;

public interface UserService {

    // create user
    UserDto createUser(UserDto userDto);

    // get user by email
    User getUserByEmail(String email);

    // update user
    UserDto updateUser(UserDto userDto, String userId);

    // delete user
    void deleteUser(String userId);

    // get user by id
    UserDto getUserById(String userId);

    // get all users
    Iterable<UserDto> getAllUsers();

    // user services sae related ---
}
