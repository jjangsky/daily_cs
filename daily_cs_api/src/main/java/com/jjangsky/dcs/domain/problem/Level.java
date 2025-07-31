package com.jjangsky.dcs.domain.problem;

import lombok.Getter;

@Getter
public enum Level {
    EASY("쉬움"),
    NORMAL("보통"),
    HARD("어려움");

    private final String description;

    Level(String description) {
        this.description = description;
    }

}
