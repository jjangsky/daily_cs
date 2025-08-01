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

    public static Level randomLevel() {
        Level[] levels = Level.values();
        int randomIndex = (int) (Math.random() * levels.length);
        return levels[randomIndex];
    }
}
