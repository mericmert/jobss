package com.obss.jobss.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class AuthExceptionHandler {

    @ExceptionHandler(InvalidAuthenticationException.class)
    public ResponseEntity<?> handleInvalidAuthenticationException(InvalidAuthenticationException exception){
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(exception.getMessage());
    }
}
