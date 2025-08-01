package com.jjangsky.dcs.domain.problem;

import lombok.Getter;

@Getter
public enum Level {
    EASY("쉬움, 개념 이해 위주의 기초 문제(정의, 기본 구조, 사용 이유 등)"),
    NORMAL("보통, 실무에서 자주 접하는 문제와 개념 (흐름 이해 + 예외 상황 다루기)"),
    HARD("어려움, 심화 설계, 성능, 보안 최적화 등 고난도 주제");

    private final String description;

    Level(String description) {
        this.description = description;
    }

    public static String randomLevel() {
        Level[] levels = Level.values();
        int randomIndex = (int) (Math.random() * levels.length);
        return levels[randomIndex].getDescription();
    }
}
