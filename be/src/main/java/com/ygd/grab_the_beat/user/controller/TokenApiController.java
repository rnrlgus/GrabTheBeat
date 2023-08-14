package com.ygd.grab_the_beat.user.controller;

import com.ygd.grab_the_beat.config.jwt.TokenProvider;
import com.ygd.grab_the_beat.user.request.AuthUserByAccessTokenRequest;
import com.ygd.grab_the_beat.user.request.CreateAccessTokenRequest;
import com.ygd.grab_the_beat.user.response.AuthUserByAccessTokenResponse;
import com.ygd.grab_the_beat.user.response.CreateAccessTokenResponse;
import com.ygd.grab_the_beat.user.service.TokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

// 토큰 발급을 위한 REST API
@RequiredArgsConstructor
@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class TokenApiController {

    private final TokenService tokenService;
    private final TokenProvider tokenProvider;

    @PostMapping("/api/token")
    public ResponseEntity<CreateAccessTokenResponse> createNewAccessToken(@RequestBody CreateAccessTokenRequest request) {
        // 새로운 Access Token 발급
        String newAccessToken = tokenService.createNewAccessToken(request.getRefreshToken());

        // CreateAccessTokenResponse DTO 객체로 newAccessToken을 감싸고 클라이언트에게 응답
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new CreateAccessTokenResponse(newAccessToken));
    }

    @PostMapping("/api/auth")
    public ResponseEntity<AuthUserByAccessTokenResponse> authUserByAccessToken(@RequestBody AuthUserByAccessTokenRequest request) {
        String accessToken = request.getAccessToken();

        AuthUserByAccessTokenResponse authUserId = new AuthUserByAccessTokenResponse();
        if (tokenProvider.validToken(accessToken)) {
            Long userId = tokenProvider.getUserId(accessToken);
            authUserId.setUserId(userId);
            return ResponseEntity.status(HttpStatus.OK)
                    .body(authUserId);
        } else {
            return new ResponseEntity(HttpStatus.UNAUTHORIZED);
        }
    }

}
