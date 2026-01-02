package com.mandeep.path.dtos;

public record LoginRequest(
        String email,
        String password
) {
}
