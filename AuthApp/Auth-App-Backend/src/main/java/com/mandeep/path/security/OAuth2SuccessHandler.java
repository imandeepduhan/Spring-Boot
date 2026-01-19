package com.mandeep.path.security;

import com.mandeep.path.entities.Provider;
import com.mandeep.path.entities.RefreshToken;
import com.mandeep.path.entities.User;
import com.mandeep.path.repositories.RefreshTokenRepository;
import com.mandeep.path.repositories.UserRepository;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.aspectj.apache.bcel.classfile.Module;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.time.Instant;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final CookieService cookieService;
    private final RefreshTokenRepository refreshTokenRepository;

    @Value("${app.auth.frontend.success-redirect}")
    private String frontEndSuccessUrl;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        logger.info("Successful authentication");
        logger.info(authentication.toString());

        OAuth2User oAuth2User =(OAuth2User)authentication.getPrincipal();

        // identify user:
        String registrationId="unknown";
        if(authentication instanceof OAuth2AuthenticationToken token) {
            registrationId = token.getAuthorizedClientRegistrationId();
        }

        logger.info("registrationId:"+registrationId);
        logger.info("user:"+oAuth2User.getAttributes().toString());

        User user;
        switch (registrationId) {
            case "google" -> {

                String email = oAuth2User.getAttributes().get("email").toString();
                String name = oAuth2User.getAttributes().get("name").toString();
                String picture = oAuth2User.getAttributes().get("picture").toString();

                user = userRepository.findByEmail(email)
                        .orElseGet(() -> userRepository.save(
                                User.builder()
                                        .email(email)
                                        .name(name)
                                        .enable(true)
                                        .image(picture)
                                        .provider(Provider.GOOGLE)
                                        .build()
                        ));
            }

            case "github" -> {
                String login = oAuth2User.getAttributes().get("login").toString();
                String email = oAuth2User.getAttributes().getOrDefault("email", login + "@github.com").toString();
                String name = oAuth2User.getAttributes().getOrDefault("name", login).toString();
                String picture = oAuth2User.getAttributes().getOrDefault("avatar_url", "").toString();

                user = userRepository.findByEmail(email)
                        .map(u -> {
                            u.setEnable(true);
                            return userRepository.save(u);
                        })
                        .orElseGet(() -> userRepository.save(
                                User.builder()
                                        .email(email)
                                        .name(name)
                                        .enable(true)
                                        .image(picture)
                                        .provider(Provider.GITHUB)
                                        .build()
                        ));
            }

            default -> {
                throw new RuntimeException("Invalid registration id");
            }
        }
        // username
        // user email
        // new username


        // jwt token__ token ke sath front-- pe fir redirect

        // refresh:
        // user--> refresh token unko revoke

        // refresh token bana k dunga:
        String jti = UUID.randomUUID().toString();
        RefreshToken refreshTokenOb = RefreshToken.builder()
                .jti(jti)
                .user(user)
                .revoked(false)
                .createdAt(Instant.now())
                .expiresAt(Instant.now().plusSeconds(jwtService.getRefreshTtlSeconds()))
                .build();

        refreshTokenRepository.save(refreshTokenOb);

        String accessToken = jwtService.generateAccessToken(user);
        String refreshToken = jwtService.generateRefreshToken(user, refreshTokenOb.getJti());
        cookieService.attachRefreshCookie(response,refreshToken,(int)jwtService.getRefreshTtlSeconds());


        response.sendRedirect(frontEndSuccessUrl);
    }
}

